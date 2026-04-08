package com.smarttrip.aiservice.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItineraryController {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;
    private final String systemPrompt;
    private final String openAiApiKey;

    public ItineraryController(ChatClient.Builder chatClientBuilder, VectorStore vectorStore,
                              @Value("${ai.prompts.itinerary.system}") String systemPrompt,
                              @Value("${spring.ai.openai.api-key:}") String openAiApiKey) {
        this.chatClient = chatClientBuilder.build();
        this.vectorStore = vectorStore;
        this.systemPrompt = systemPrompt;
        this.openAiApiKey = openAiApiKey;
    }

    public record ItineraryRequest(
        @NotBlank String destination,
        @NotNull @PositiveOrZero Integer days,
        @NotNull @PositiveOrZero Integer budgetEur,
        List<String> constraints
    ) {}

    public record ItineraryResponse(String markdown) {}

    @PostMapping("/api/ai/itinerary")
    public ItineraryResponse itinerary(@RequestBody ItineraryRequest req) {
        if (openAiApiKey == null || openAiApiKey.isBlank() || "dev-placeholder".equals(openAiApiKey)) {
            return new ItineraryResponse("""
                OPENAI_API_KEY non configurata: impostala e riprova.

                Richiesta ricevuta:
                - destinazione: %s
                - giorni: %s
                - budget: %s EUR
                - vincoli: %s

                Nota: la pipeline RAG e il prompt sono presenti, ma senza un provider LLM non posso generare l’itinerario.
                """.formatted(req.destination(), req.days(), req.budgetEur(), req.constraints()));
        }

        var query = "Travel info for " + req.destination();
        var searchRequest = SearchRequest.builder().query(query).topK(8).build();
        List<Document> contextDocs = vectorStore.similaritySearch(searchRequest);

        var context = contextDocs.stream()
            .map(d -> "- " + d.getText())
            .reduce("", (a, b) -> a + "\n" + b);

        var user = """
            Destinazione: %s
            Giorni: %s
            Budget (EUR): %s
            Vincoli: %s

            Contesto (RAG):
            %s
            """.formatted(req.destination(), req.days(), req.budgetEur(), req.constraints(), context);

        var prompt = new Prompt(systemPrompt + "\n\n" + user);
        var answer = chatClient.prompt(prompt).call().content();
        return new ItineraryResponse(answer);
    }
}

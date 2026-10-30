export interface SenseiExplanationRequest {
  question: string;
  context?: string;
  lessonNumber?: number;
  targetScript?: string;
  userLanguage?: string;
}

export interface SenseiExplanationResponse {
  explanation: string;
  source: string;
  model: string;
  error?: string;
}

class SenseiService {
  public async getExplanation(req: SenseiExplanationRequest): Promise<SenseiExplanationResponse> {
    try {
      const response = await fetch('/api/sensei/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      return await response.json();
    } catch (err: any) {
      console.warn('Sensei service fetch failed, using pedagogical local guide:', err);
      return {
        explanation: this.generateLocalFallback(req.question),
        source: 'local_engine',
        model: 'blaze-pedagogy-v1'
      };
    }
  }

  private generateLocalFallback(query: string): string {
    const q = query.toLowerCase();

    if (q.includes('は') && q.includes('が') || q.includes('wa') && q.includes('ga')) {
      return `### Sensei Grammar Guide: は (wa) vs が (ga)\n\n**1. Key Distinction:**\n- **は (Topic Marker):** Marks the conversational frame ("As for X..."). It focuses on what follows the topic (new information is in the predicate).\n- **が (Subject Marker):** Marks specific identity or new information ("It is X that..."). It focuses on the subject itself.\n\n**2. Example:**\n- わたし**は** がくせいです (As for me, I am a student).\n- だれ**が** きましたか？ (Who came?)\n- ミラーさん**が** きました (It is Mr. Miller who came).\n\n**3. Verbs of Existence:**\n- Always use が with います and あります: いぬ**が** います (There is a dog).`;
    }

    if (q.includes('te') || q.includes('て') || q.includes('group')) {
      return `### Sensei Grammar Guide: Verb Groups & Te-form Conjugation\n\n**1. Group I (U-verbs / Godan):**\n- -u, -tsu, -ru → -tte (買う → 買って, 待つ → 待って)\n- -mu, -bu, -nu → -nde (飲む → 飲んで, 呼ぶ → 呼んで)\n- -ku → -ite (書く → 書いて) *Exception: 行く → 行って*\n- -gu → -ide (泳ぐ → 泳いで)\n- -su → -shite (話す → 話して)\n\n**2. Group II (Ru-verbs / Ichidan):**\n- Drop ます / る, add て (食べる → 食べて, 見る → 見て)\n\n**3. Group III (Irregular):**\n- します → して\n- 来ます (kimasu) → 来て (kite)`;
    }

    if (q.includes('あげ') || q.includes('くれ') || q.includes('もら') || q.includes('giving')) {
      return `### Sensei Grammar Guide: あげます vs もらいます vs くれます\n\n**1. あげます (Giving):**\n- Giver giver gives to receiver: わたしは 友だちに 本を あげました (I gave a book to a friend).\n\n**2. もらいます (Receiving):**\n- Receiver receives from giver: わたしは 先生に 本を もらいました (I received a book from the teacher).\n\n**3. くれます (In-group Receiving):**\n- Someone outside gives TO ME or my family: 山田さんは わたしに 花を くれました (Mr. Yamada gave flowers to me).`;
    }

    return `### Sensei Guide: "${query}"\n\n**Japanese Core Rule:**\n1. Word order in Japanese is strictly **SOV** (Subject - Object - Verb).\n2. Japanese particles (は, が, を, に, で, へ, と, から, まで) link nouns with verbs.\n3. Keep your focus on daily review and consistent spaced practice in the Lesson Lab!`;
  }
}

export const senseiService = new SenseiService();

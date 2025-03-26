"use server";

export async function actionFetchDataFromServer<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

  try {
    const res = await fetch(url, {
      ...options,
      method: options?.method || "GET",
      headers: {
        "Content-Type": "application/json", // Header padrão
        ...options?.headers,
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      const errorBody = await res.text(); // Adiciona detalhes do erro
      throw new Error(`Error: ${res.status} ${res.statusText} | ${errorBody}`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw new Error(`Fetch Error: ${error.message} at ${url}`); // Inclui a URL no erro para depuração
    }
    throw new Error("An unknown error occurred");
  } finally {
    clearTimeout(timeout);
  }
}

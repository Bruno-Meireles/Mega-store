const FAKE_STORE_URL = "https://fakestoreapi.com/products";
const VIACEP_URL = "https://viacep.com.br/ws";

export async function fetchProducts(limit = 8) {
  const response = await fetch(`${FAKE_STORE_URL}?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return response.json();
}

export async function fetchAddressByCep(cep) {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) {
    throw new Error("CEP inválido. Informe 8 dígitos.");
  }

  const response = await fetch(`${VIACEP_URL}/${cleanCep}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao consultar o CEP.");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  return data;
}

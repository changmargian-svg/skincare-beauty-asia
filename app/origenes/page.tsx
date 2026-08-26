async function obtenerPaisesCosmetica() {
  const codigos = ['kr', 'fr', 'us', 'jp'];
  
  try {
    const respuestas = await Promise.all(
      codigos.map((code) =>
        fetch(`https://restcountries.com/v3.1/alpha/${code}`, {
          cache: 'no-store',
        }).then((res) => (res.ok ? res.json() : null))
      )
    );

    const listaPaises = respuestas
      .filter((res) => res && res.length > 0)
      .map((res) => res[0]);

    return listaPaises;
  } catch (error) {
    console.error('Error al obtener países:', error);
    return [];
  }
}
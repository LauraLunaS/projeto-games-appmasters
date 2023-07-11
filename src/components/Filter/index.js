
export default function Filter() {
    return (
      <div>
        <h1>Filtro de Jogos</h1>
        <div>
          <label htmlFor="tituloInput">Título:</label>
          <input type="text" id="tituloInput" />
        </div>
        <div>
          <label htmlFor="generoSelect">Gênero:</label>
          <select id="generoSelect">
            <option value="">Todos</option>
            <option value="acao">Ação</option>
            <option value="plataforma">Plataforma</option>
            <option value="simulacao">Simulação</option>
            {/* Adicione outras opções de gênero aqui */}
          </select>
        </div>
        <div>
          <label htmlFor="avaliacaoSelect">Avaliação mínima:</label>
          <select id="avaliacaoSelect">
            <option value="">Todas</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            {/* Adicione outras opções de avaliação aqui */}
          </select>
        </div>
        <button>Filtrar</button>
        {/* Aqui você pode adicionar a lógica para exibir os jogos filtrados */}
      </div>
    );
}
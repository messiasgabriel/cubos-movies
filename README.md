# 🎬 Cubos Movies

Aplicação web responsiva para pesquisa e exibição de detalhes de filmes utilizando a API do [TMDB](https://developer.themoviedb.org/).  
Desenvolvido como desafio técnico para o processo seletivo da [Cubos](https://cubos.io/).

## 🚀 Demo
[🔗 Acesse aqui](https://cubos-movies-xi.vercel.app/)

## 🔧 Configuração

### A versão LTS do node deve estar instalada na sua máquina: [Baixar Node](https://nodejs.org/en)

### Crie sua conta na plataforma do TMDD para acessar sua API_KEY: [TMDB](https://developer.themoviedb.org/docs/getting-started)

### Variáveis de Ambiente
```env
VITE_TMDB_API_KEY=sua_chave_api_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Scripts Disponíveis
```bash
npm install      # Instalação de dependencias
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

## ✨ Funcionalidades

### 🏠 Página Principal
- 🔍 **Busca inteligente** com debounce para pesquisar filmes
- 🎛️ **Filtros avançados** por ano, gênero, avaliação e ordenação
- 📱 **Design responsivo** que se adapta a qualquer dispositivo
- 🎯 **Paginação** para navegar entre resultados
- 🌟 **Cards interativos** com informações e avaliações dos filmes

### 🎭 Página de Detalhes do Filme
- 📋 **Informações completas** do filme (sinopse, duração, orçamento, receita)
- 🎥 **Trailer integrado** do YouTube quando disponível
- 🏷️ **Gêneros** e **classificações** organizados
- 📊 **Indicador visual** de avaliação com gráfico circular
- 🌈 **Background dinâmico** usando o backdrop do filme

### 🎨 Sistema de Temas
- 🌙 **Modo escuro/claro** com toggle suave
- 🎨 **Design system** baseado em **Radix Colors**
- ✨ **Animações fluidas** e transições suaves

## 🛠️ Tecnologias Utilizadas

### Frontend
- ⚛️ **React 18** - Biblioteca para interfaces de usuário
- 📘 **TypeScript** - Tipagem estática para JavaScript
- ⚡ **Vite** - Build tool rápido e moderno

### Roteamento e Estado
- 🧭 **TanStack Router** - Roteamento type-safe
- 🔄 **TanStack Query** - Gerenciamento de estado servidor
- 🎣 **Custom Hooks** - Lógica reutilizável

### Estilização
- 🎨 **TailwindCSS** 
- 🌈 **Radix Colors** 
- 📱 **Design Responsivo** 

### API e Dados
- 🎬 **TMDB API** - The Movie Database
- 📡 **Axios** - Cliente HTTP para requisições
- ⏱️ **Debounce** - Otimização de busca

## 📁 Estrutura do Projeto

```
src/
├── 📁 api/                  # Configuração da API
│   └── tmdb.ts                # cliente API para o TMDB
├── 📁 components/           # Componentes React
│   ├── 📁 layout/           # Componentes de layout
│   │   ├── Header.tsx         # Cabeçalho com logo e toggle tema
│   │   ├── Footer.tsx         # Rodapé da aplicação
│   │   └── Layout.tsx         # Layout principal com background
│   ├── 📁 movies/           # Componentes relacionados a filmes
│   │   ├── MovieCard.tsx      # Card individual do filme
│   │   ├── MovieList.tsx      # Lista de filmes
│   │   ├── MovieFilters.tsx   # Filtros de busca
│   │   └── MovieTrailer.tsx   # Player de trailer
│   └── 📁 ui/               # Componentes de interface
│       ├── SearchInput.tsx    # Campo de busca
│       ├── Pagination.tsx     # Componente de paginação
│       ├── InfoCard.tsx       # Cards informativos
│       ├── ThemeToggle.tsx    # Toggle de tema
│       └── Skeleton.tsx       # Loading states
├── 📁 hooks/                # Hooks customizados
│   ├── useMovies.ts           # Hook para busca de filmes
│   ├── useMovieTrailer.ts     # Hook para trailers
│   ├── useTheme.ts            # Hook para gerenciar tema
│   └── useDebounce.ts         # Hook para debounce
├── 📁 pages/                # Páginas da aplicação
│   ├── HomePage.tsx           # Página principal
│   └── MovieDetailsPage.tsx   # Página de detalhes
├── 📁 types/                # Definições TypeScript
│   ├── movie.ts               # Tipos relacionados a filmes
│   └── others.ts              # Outros tipos
├── 📁 utils/                # Utilitários
│   ├── constants.ts           # Constantes da aplicação
│   └── formatters.ts          # Funções de formatação
├── 📁 routes/               # Configuração de rotas
│   └── index.tsx              # Definição das rotas
└── 📁 styles/               # Estilos globais
    └── global.css             # CSS global e temas
```

## 🎯 Principais Componentes

### 🎬 MovieCard
Card interativo que exibe:
- 🖼️ Poster do filme
- ⭐ Avaliação com indicador visual
- 🏷️ Gêneros (hover)
- 📊 Animações suaves

### 🔍 Sistema de Filtros
- 📅 **Ano de lançamento** (últimos 50 anos)
- 🎭 **Gêneros** (carregados dinamicamente)
- 📊 **Ordenação** (popularidade, data, avaliação)
- ⭐ **Avaliação mínima** (slider interativo)

### 📱 Design Responsivo
- 📱 **Mobile**: Grid 2 colunas
- 📟 **Tablet**: Grid 3-4 colunas  
- 💻 **Desktop**: Grid 5 colunas
- 🖥️ **Layout adaptativo** em todas as telas

## 🎨 Sistema de Cores

Utiliza **Radix Colors** para garantir consistência:

```css
/* Cores principais */
--mauve-1 a --mauve-12    /* Escala de cinzas */
--purple-1 a --purple-12  /* Tons de roxo */

/* Temas */
.dark { /* Tema escuro */ }
.light { /* Tema claro */ }
```

## 🚀 Funcionalidades Técnicas

### ⚡ Performance
- **Debounce** na busca (500ms)
- **Lazy loading** de imagens
- **Cache inteligente** com TanStack Query
- **Skeleton loading** durante carregamento

### 🎯 UX/UI
- **Animações fluidas** com Tailwind
- **Estados de loading** informativos
- **Feedback visual** em todas as interações
- **Navegação intuitiva** type-safe

### 📱 Responsividade
- **Design mobile-first**
- **Breakpoints consistentes**
- **Grid system adaptativo**
- **Imagens otimizadas** por tamanho de tela

## 🎬 Integração TMDB

### Endpoints Utilizados
- 🔍 `/search/movie` - Busca de filmes
- 🎭 `/discover/movie` - Descoberta com filtros
- 📋 `/movie/{id}` - Detalhes do filme
- 🎥 `/movie/{id}/videos` - Trailers e vídeos
- 🏷️ `/genre/movie/list` - Lista de gêneros

### Tratamento de Dados
- ✅ **Fallbacks** para dados ausentes
- 🌐 **Idioma português** como padrão
- 🎥 **Fallback inglês** para trailers
- 🖼️ **Placeholder** para imagens ausentes

---

<div align="center">

**🎬 Desenvolvido para os amantes do cinema**

</div>

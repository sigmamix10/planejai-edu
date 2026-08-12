# Guia de Configuração e Desenvolvimento

## ✅ Configurações Realizadas

### 1. **Prettier** - Formatação de Código

- **Arquivo**: `.prettierrc.json`
- **Recursos**:
  - Espaçamento: 2 espaços (tabs)
  - Quebra de linha automática em 100 caracteres
  - Aspas simples
  - Plugin para ordenação de classes Tailwind CSS

### 2. **ESLint** - Linting

- **Arquivo**: `eslint.config.js`
- **Recursos**:
  - Integrado com Prettier
  - Suporte a React Hooks
  - TypeScript support
  - Detecta imports não utilizados
  - Remove automaticamente imports não utilizados ao salvar

### 3. **VSCode** - Configurações do Editor

- **Arquivo**: `.vscode/settings.json`
- **Recursos**:
  - ✨ **Formatação automática ao salvar**
  - Espaçamento padrão de 2 espaços
  - Auto-formatação ao colar
  - Linting automático
  - Remoção automática de imports não utilizados

### 4. **TypeScript** - Aliases de Importação

- **Arquivo**: `tsconfig.app.json` e `vite.config.ts`
- **Alias**: `@/` → `src/`
- **Exemplo de uso**:
  ```typescript
  import { Button } from '@/components/Button';
  import { useAuth } from '@/hooks/useAuth';
  ```

### 5. **EditorConfig** - Padronização de Indentação

- **Arquivo**: `.editorconfig`
- **Suporte**: Garante 2 espaços em todos os editores

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Linting
npm run lint          # Apenas verifica
npm run lint:fix      # Corrige automaticamente

# Formatação
npm run format        # Formata todos os arquivos
npm run format:check  # Verifica se há arquivos não formatados

# Preview
npm run preview
```

## 📦 Extensões Recomendadas do VSCode

O projeto recomenda instalar as seguintes extensões:

1. **Prettier - Code formatter** (esbenp.prettier-vscode)
2. **ESLint** (dbaeumer.vscode-eslint)
3. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
4. **MDX** (unifiedjs.vscode-mdx)

Para instalar automaticamente, execute na paleta de comandos:

```
Extensions: Show Recommended Extensions
```

## 💡 Como Funciona a Formatação Automática

Quando você **salva um arquivo** (Ctrl+S):

1. ✅ **ESLint** valida o código
2. ✅ **Prettier** formata automaticamente
3. ✅ **Imports não utilizados** são removidos
4. ✅ **Imports** são organizados

Tudo acontece **automaticamente sem intervenção manual!**

## 🎯 Configuração de Espaçamento

- **Padrão**: 2 espaços
- **Tabs**: Convertidas em espaços
- **Aplicado a**: JS, TS, JSX, TSX, JSON, CSS, HTML

## 🔍 Verificação de Conformidade

Para verificar se seu código está em conformidade:

```bash
npm run lint           # Verifica ESLint
npm run format:check   # Verifica Prettier
```

## 🔧 Troubleshooting

### Prettier não formata automaticamente

- Verifique se a extensão Prettier está instalada
- Certifique-se de que Prettier é o formatter padrão nas configurações

### ESLint não funciona

- Instale a extensão ESLint do VSCode
- Reinicie o VSCode se necessário

### Imports não são organizados

- O VSCode faz isso automaticamente ao salvar
- Se não funcionar, execute `npm run lint:fix`

## 📝 Notas

- Todas as configurações estão centralizadas nos arquivos de config
- A formatação é determinística e consistente
- O projeto está pronto para trabalho em equipe com padrões definidos

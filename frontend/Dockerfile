FROM node:20-alpine

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy application code
COPY . .

# Expose port
EXPOSE 5173

# Run in development mode (for production, use: pnpm build && pnpm preview)
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

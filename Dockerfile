FROM mcr.microsoft.com/playwright:focal

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./

# Установка зависимостей проекта
RUN npm install

# Устанавливаем xvfb для эмуляции дисплея
RUN apt-get update && apt-get install -y xvfb

# Копирование всех файлов проекта
COPY . .

# Открываем порт 3333 для UI
EXPOSE 3333

# Команда для запуска UI через xvfb с флагом --no-sandbox
CMD ["npx", "codecept-ui", "run"]

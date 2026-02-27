#!/bin/bash

echo "Starting services with Docker Compose..."
docker compose up -d

echo ""
echo "Services started!"
echo "Backend:  http://localhost:4703"
echo "Frontend: http://localhost:4701"
echo ""
echo "To view logs: docker compose logs -f"
echo "To stop: ./down.sh"

resource "aws_ecs_cluster" "hawkins_cluster" {
  name = "hawkins-ecs-cluster"
}

resource "aws_ecs_task_definition" "hawkins_task" {
  family                   = "hawkins-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "stranger-app"
      image     = var.docker_image
      essential = true
      portMappings = [{
        containerPort = 8080
      }]
    }
  ])
}

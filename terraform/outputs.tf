output "hawkins_cluster" {
  value = aws_ecs_cluster.hawkins_cluster.name
}

output "portal_dns" {
  value = aws_lb.upside_portal.dns_name
}

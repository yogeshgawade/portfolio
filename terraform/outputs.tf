output "bucket_name" {
  value = aws_s3_bucket.portfolio.id
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions.arn
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.portfolio.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.portfolio.domain_name
}

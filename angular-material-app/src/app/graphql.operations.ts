import { gql } from "apollo-angular";

export const GET_BLOG_INFO = gql`
	query Publication($host: String!) {
		publication(host: $host) {
			id
			title
			isTeam
			links {
				twitter
				instagram
				github
				website
				hashnode
				youtube
				dailydev
				linkedin
				mastodon
			}
			followersCount
			url
			favicon
		}
	}
`;

export const GET_AUTHOR_INFO = gql`
	query Publication($host: String!) {
		publication(host: $host) {
			id
			author {
				id
				name
				username
				profilePicture
				socialMediaLinks {
					__typename
					facebook
					github
					instagram
					linkedin
					stackoverflow
					twitter
					website
					youtube
				}
			}
		}
	}
`;

export const GET_POSTS = gql`
	query Publication($host: String!) {
		publication(host: $host) {
			id
			isTeam
			title
			posts(first: 10) {
				edges {
					node {
						id
						slug
						coverImage {
							url
						}
						title
						brief
						content {
							html
						}
					}
				}
			}
		}
	}
`;

export const GET_SERIES_LIST = gql`
	query Publication($host: String!) {
		publication(host: $host) {
			id
			title
			seriesList(first: 10) {
				edges {
					node {
						id
						name
						slug
					}
				}
			}
		}
	}
`;

export const GET_POSTS_IN_SERIES = gql`
	query Publication($host: String!, $slug: String!) {
		publication(host: $host) {
			id
			isTeam
			title
			series(slug: $slug) {
				posts(first: 10) {
					edges {
						node {
							id
							title
							slug
							coverImage {
								url
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_SINGLE_POST = gql`
	query SinglePost($host: String!, $slug: String!) {
		publication(host: $host) {
      id
			post(slug: $slug) {
				id
				slug
				title
				readTimeInMinutes
				tags {
					name
				}
				author {
          id
					name
          username
					profilePicture
				}
				coverImage {
					url
				}
				content {
					html
				}
				publishedAt
			}
		}
	}
`;

export const SEARCH_POSTS = gql`
	query SearchPostsOfPublicationFilter(
		$publicationId: ObjectId!
		$query: String!
	) {
		searchPostsOfPublication(
			first: 5
			filter: { publicationId: $publicationId, query: $query }
		) {
			edges {
				node {
					id
					slug
					coverImage {
						url
					}
					author {
            id
						name
            username
					}
					publishedAt
					title
				}
			}
		}
	}
`;

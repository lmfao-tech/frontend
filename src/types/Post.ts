type Post = {
	username: string
	user: string
	profile_image_url: string
	tweet_id: number
	tweet_text: string
	tweet_link: string,
	tweet_created_at: string,
	meme_link: string,
	user_id: string,
	removed_by?: string,
}

export default Post;
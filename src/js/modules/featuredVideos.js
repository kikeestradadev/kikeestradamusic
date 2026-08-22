const featuredVideos = () => {
	document.querySelectorAll('.featured-videos').forEach((root) => {
		if (root.dataset.featuredVideosReady === 'true') {
			return;
		}

		const embeds = root.querySelectorAll('.featured-videos__embed');

		if (!embeds.length) {
			return;
		}

		const playEmbed = (embed) => {
			const url = embed.dataset.videoEmbed;
			const title = embed.dataset.videoTitle || '';

			if (!url) {
				return;
			}

			const separator = url.includes('?') ? '&' : '?';
			const iframe = document.createElement('iframe');
			iframe.className = 'featured-videos__iframe';
			iframe.src = `${url}${separator}autoplay=1`;
			iframe.title = title;
			iframe.allow =
				'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
			iframe.allowFullscreen = true;
			iframe.referrerPolicy = 'strict-origin-when-cross-origin';

			embed.replaceChildren(iframe);
		};

		embeds.forEach((embed) => {
			const playButton = embed.querySelector('.featured-videos__play');
			playButton?.addEventListener('click', () => {
				playEmbed(embed);
			});
		});

		root.dataset.featuredVideosReady = 'true';
	});
};

export default featuredVideos;

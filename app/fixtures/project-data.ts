const github_root = 'https://github.com/jonchoukroun';

const projects = [
  {
    name:        'Future Butcher',
    share_image: 'https://s3-us-west-1.amazonaws.com/futurebutcher.com/assets/share-image.png',
    description: 'Turn-based strategy game set in a dark, man-eat-man future.',
    project_url: 'https://www.futurebutcher.com',
    link_text:   'Play',
    stack: [
      {
        tech:        'Elixir',
        description: 'Powers the game engine, which is managed as a GenServer process.',
        github_link: `${github_root}/future-butcher-engine`
      },
      {
        tech:        'Phoenix',
        description: 'Phoenix Channels provide a websocket transport layer between the game engine and the client.',
        github_link: `${github_root}/future-butcher-api`
      },
      {
        tech:        'Ember.js',
        description: "Provides the client-side game experience, leveraging Ember's Service object to handle game state via Phoenix Channels.",
        github_link: `${github_root}/future-butcher-web`
      }
    ]
  },
  {
    name:        'William Storck Portfolio',
    share_image: 'https://s3.amazonaws.com/storck/assets/share-image.jpg',
    description: 'Portfolio site for the artist William Storck.',
    project_url: 'https://www.williamstorck.com',
    link_text:   'View',
    stack: [
      {
        tech:        'Elixir/Phoenix',
        description: 'Phoenix framework web app for user-facing image display.',
        github_link: `${github_root}/william_storck_phx`
      },
      {
        tech:        'Elixir/Phoenix',
        description: 'Phoenix framework web app for admin tasks like painting upload and category management.',
        github_link: `${github_root}/william_storck_admin`
      }
    ]
  },
  {
    name:        'Reshot',
    share_image: 'https://assets-static.reshot-cdn.com/social-meta/reshot-facebook-og-image.jpg',
    description: 'Free handpicked, authentic photos',
    project_url: 'https://www.reshot.com',
    link_text:   'View',
    stack: [
      {
        tech:        'Ruby/Sinatra',
        description: 'JSON API serves a curated photo collection, along with photographer data. Also handles download and notification requests.'
      },
      {
        tech:        'Ember.js',
        description: 'Showcases authentic photos in simple CSS grid layout. Uses Fastboot for server-side rendering.'
      }
    ]
  }
]

export { projects }

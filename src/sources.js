const nuesProviders = [
    {
        id: "abc-news",
        name: "ABC News",
        description: "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
        url: "https://abcnews.go.com",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/1971_ABC_logo.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "axios",
        name: "Axios",
        description: "Axios are a new media company delivering vital, trustworthy news and analysis in the most efficient, illuminating and shareable ways possible.",
        url: "https://www.axios.com",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Axios.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "bloomberg",
        name: "Bloomberg",
        description: "Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.",
        url: "http://www.bloomberg.com",
        logo: "https://www.casselsalpeter.com/wp-content/uploads/2013/10/Roar-MediaLogos-Bloomberg-Square.jpg",
        category: "business",
        language: "en",
        country: "us"
    },
    {
        id: "business-insider",
        name: "Business Insider",
        description: "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
        url: "http://www.businessinsider.com",
        logo: "https://end.org/cms/assets/uploads/2019/10/Business-Insider-Square.jpg",
        category: "business",
        language: "en",
        country: "us"
    },
    {
        id: "cbs-news",
        name: "CBS News",
        description: "CBS News: dedicated to providing the best in journalism under standards it pioneered at the dawn of radio and television and continue in the digital age.",
        url: "http://www.cbsnews.com",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/CBS_Eyemark.svg",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "cnbc",
        name: "CNBC",
        description: "Get latest business news on stock markets, financial & earnings on CNBC. View world markets streaming charts & video; check stock tickers and quotes.",
        url: "http://www.cnbc.com",
        logo: "https://sc.cnbcfm.com/applications/cnbc.com/staticcontent/img/cnbc_logo.gif?v=1524171804",
        category: "business",
        language: "en",
        country: "us"
    },
    {
        id: "cnn",
        name: "CNN",
        description: "View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN",
        url: "http://us.cnn.com",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "crypto-coins-news",
        name: "Crypto Coins News",
        description: "Providing breaking cryptocurrency news - focusing on Bitcoin, Ethereum, ICOs, blockchain technology, and smart contracts.",
        url: "https://www.ccn.com",
        logo: "data:image/png;base64,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",
        category: "technology",
        language: "en",
        country: "us"
    },
    {
        id: "engadget",
        name: "Engadget",
        description: "Engadget is a web magazine with obsessive daily coverage of everything new in gadgets and consumer electronics.",
        url: "https://www.engadget.com",
        logo: "https://seeklogo.com/images/E/engadget-logo-62770382B4-seeklogo.com.png",
        category: "technology",
        language: "en",
        country: "us"
    },
    {
        id: "entertainment-weekly",
        name: "Entertainment Weekly",
        description: "Online version of the print magazine includes entertainment news, interviews, reviews of music, film, TV and books, and a special area for magazine subscribers.",
        url: "http://www.ew.com",
        logo: "https://images.squarespace-cdn.com/content/v1/5b038b83a9e028b6553ae4b4/1530683472115-7D6VEVML9I1YX4YNB7PA/ke17ZwdGBToddI8pDm48kKbvziBh9F3O3YCZyXQS1alZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVEwjg60a_MNYH45YZWRk1zAXD85H1vdb9zVgWvzye1P_xur-lC0WofN0YB1wFg-ZW0/Entertainment-Weekly-Logo+Square.png",
        category: "entertainment",
        language: "en",
        country: "us"
    },
    {
        id: "fortune",
        name: "Fortune",
        description: "Fortune 500 Daily and Breaking Business News",
        url: "http://fortune.com",
        logo: "https://spacetimeinsight.com/wp-content/uploads/2016/09/fortune-logo-square.png",
        category: "business",
        language: "en",
        country: "us"
    },
    {
        id: "fox-news",
        name: "Fox News",
        description: "Breaking News, Latest News and Current News from FOXNews.com. Breaking news and video. Latest Current News: U.S., World, Entertainment, Health, Business, Technology, Politics, Sports.",
        url: "http://www.foxnews.com",
        logo: "data:image/png;base64,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",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "fox-sports",
        name: "Fox Sports",
        description: "Find live scores, player and team news, videos, rumors, stats, standings, schedules and fantasy games on FOX Sports.",
        url: "http://www.foxsports.com",
        logo: "data:image/jpeg;base64,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",
        category: "sports",
        language: "en",
        country: "us"
    },
    {
        id: "google-news",
        name: "Google News",
        description: "Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News.",
        url: "https://news.google.com",
        logo: "https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=w300-rw",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "hacker-news",
        name: "Hacker News",
        description: `Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by Paul Graham's investment fund and startup incubator, Y Combinator. In general, content that can be submitted is defined as "anything that gratifies one's intellectual curiosity".`,
        url: "https://news.ycombinator.com",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1024px-Y_Combinator_logo.svg.png",
        category: "technology",
        language: "en",
        country: "us"
    },
    {
        id: "ign",
        name: "IGN",
        description: "IGN is your site for Xbox One, PS4, PC, Wii-U, Xbox 360, PS3, Wii, 3DS, PS Vita and iPhone games with expert reviews, news, previews, trailers, cheat codes, wiki guides and walkthroughs.",
        url: "http://www.ign.com",
        logo: "https://media.glassdoor.com/sqll/9852/ign-entertainment-squarelogo.png",
        category: "entertainment",
        language: "en",
        country: "us"
    },
    {
        id: "mashable",
        name: "Mashable",
        description: "Mashable is a global, multi-platform media and entertainment company.",
        url: "https://mashable.com",
        logo: "https://media.glassdoor.com/sqll/255718/mashable-squarelogo-1430326903133.png",
        category: "entertainment",
        language: "en",
        country: "us"
    },
    {
        id: "msnbc",
        name: "MSNBC",
        description: "Breaking news and in-depth analysis of the headlines, as well as commentary and informed perspectives from The Rachel Maddow Show, Morning Joe & more.",
        url: "http://www.msnbc.com",
        logo: "https://www.carminegallo.com/wp-content/uploads/2016/04/msnbc-logo-card-e1534801444170.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "mtv-news",
        name: "MTV News",
        description: "The ultimate news source for music, celebrity, entertainment, movies, and current events on the web. It's pop culture on steroids.",
        url: "http://www.mtv.com/news",
        logo: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/012020/mtv_news.png?dC2G3lqp2bhiI3_eQgFEKDh6ppeReAkZ&itok=3YaABA4j",
        category: "entertainment",
        language: "en",
        country: "us"
    },
    {
        id: "national-geographic",
        name: "National Geographic",
        description: "Reporting our world daily: original nature and science news from National Geographic.",
        url: "http://news.nationalgeographic.com",
        logo: "https://cdn.worldvectorlogo.com/logos/national-geographic.svg",
        category: "science",
        language: "en",
        country: "us"
    },
    {
        id: "national-review",
        name: "National Review",
        description: "National Review: Conservative News, Opinion, Politics, Policy, & Current Events.",
        url: "https://www.nationalreview.com/",
        logo: "https://www.nationalreview.com/wp-content/themes/national-review/static/images/social.jpg",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "nbc-news",
        name: "NBC News",
        description: "Breaking news, videos, and the latest top stories in world news, business, politics, health and pop culture.",
        url: "http://www.nbcnews.com",
        logo: "https://www.broadcastingcable.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY4NjI5NjExMDI5MTQ1MjIz/nbc-news-logo.jpg",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "new-scientist",
        name: "New Scientist",
        description: "Breaking science and technology news from around the world. Exclusive stories and expert analysis on space, technology, health, physics, life and Earth.",
        url: "https://www.newscientist.com/section/news",
        logo: "https://media.glassdoor.com/sqll/1988091/new-scientist-squarelogo-1526487294470.png",
        category: "science",
        language: "en",
        country: "us"
    },
    {
        id: "newsweek",
        name: "Newsweek",
        description: "Newsweek provides in-depth analysis, news and opinion about international issues, technology, business, culture and politics.",
        url: "https://www.newsweek.com",
        logo: "https://yt3.ggpht.com/a/AGF-l7-hcRCMpiySu9rzq_VxVyy-W3OCxagkUmHO8Q=s900-c-k-c0xffffffff-no-rj-mo",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "new-york-magazine",
        name: "New York Magazine",
        description: "NYMAG and New York magazine cover the new, the undiscovered, the next in politics, culture, food, fashion, and behavior nationally, through a New York lens.",
        url: "http://nymag.com",
        logo: "https://assets.nymag.com/media/sites/nymag/icon.1500x1500.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "next-big-future",
        name: "Next Big Future",
        description: "Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.",
        url: "https://www.nextbigfuture.com",
        logo: "https://www.nextbigfuture.com/wp-content/uploads/2017/04/ed85e288e0f5fe89658de9e9a0c1630c.png",
        category: "science",
        language: "en",
        country: "us"
    },
    {
        id: "nfl-news",
        name: "NFL News",
        description: "The official source for NFL news, schedules, stats, scores and more.",
        url: "http://www.nfl.com/news",
        logo: "https://static.www.nfl.com/image/upload/v1554321393/league/nvfr7ogywskqrfaiu38m.svg",
        category: "sports",
        language: "en",
        country: "us"
    },
    {
        id: "nhl-news",
        name: "NHL News",
        description: "The most up-to-date breaking hockey news from the official source including interviews, rumors, statistics and schedules.",
        url: "https://www.nhl.com/news",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/NHL_Logo_former.svg/996px-NHL_Logo_former.svg.png",
        category: "sports",
        language: "en",
        country: "us"
    },
    {
        id: "politico",
        name: "Politico",
        description: "Political news about Congress, the White House, campaigns, lobbyists and issues.",
        url: "https://www.politico.com",
        logo: "https://i2.wp.com/publicimpactpr.com/wp-content/uploads/2018/03/Politico-Logo-Square.png?fit=750%2C750&ssl=1",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "polygon",
        name: "Polygon",
        description: "Polygon is a gaming website in partnership with Vox Media. Our culture focused site covers games, their creators, the fans, trending stories and entertainment news.",
        url: "http://www.polygon.com",
        logo: "https://i.kym-cdn.com/entries/icons/facebook/000/020/540/polygonlol.jpg",
        category: "entertainment",
        language: "en",
        country: "us"
    },
    {
        id: "reuters",
        name: "Reuters",
        description: "Reuters.com brings you the latest news from around the world, covering breaking news in business, politics, entertainment, technology, video and pictures.",
        url: "http://www.reuters.com",
        logo: "https://i.pinimg.com/originals/80/57/93/805793a7696b9d82d8ca5e2b6937364e.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "techcrunch",
        name: "TechCrunch",
        description: "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
        url: "https://techcrunch.com",
        logo: "https://www.conviva.com/wp-content/uploads/2017/08/TechCrunch-Logo.png",
        category: "technology",
        language: "en",
        country: "us"
    },
    {
        id: "techradar",
        name: "TechRadar",
        description: "The latest technology news and reviews, covering computing, home entertainment systems, gadgets and more.",
        url: "http://www.techradar.com",
        logo: "https://www.printplaygames.com/wp-content/uploads/2018/06/techradar-logo.png",
        category: "technology",
        language: "en",
        country: "us"
    },
    {
        id: "the-hill",
        name: "The Hill",
        description: "The Hill is a top US political website, read by the White House and more lawmakers than any other site -- vital for policy, politics and election campaigns.",
        url: "http://thehill.com",
        logo: "https://civiliansinconflict.org/wp-content/uploads/2017/09/thehill-logo-big.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "the-huffington-post",
        name: "The Huffington Post",
        description: "The Huffington Post is a politically liberal American online news aggregator and blog that has both localized and international editions founded by Arianna Huffington, Kenneth Lerer, Andrew Breitbart, and Jonah Peretti, featuring columnists.",
        url: "http://www.huffingtonpost.com",
        logo: "https://tideline.com/wp-content/uploads/huffington-post-logo-e1467848295212.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "the-next-web",
        name: "The Next Web",
        description: "The Next Web is one of the world’s largest online publications that delivers an international perspective on the latest news about Internet technology, business and culture.",
        url: "http://thenextweb.com",
        logo: "https://media.glassdoor.com/sqll/1312527/the-next-web-squarelogo-1499165556286.png",
        category: "technology",
        language: "en",
        country: "us"
    },
    {
        id: "the-verge",
        name: "The Verge",
        description: "The Verge covers the intersection of technology, science, art, and culture.",
        url: "http://www.theverge.com",
        logo: "https://pbs.twimg.com/profile_images/877903823133704194/Mqp1PXU8.jpg",
        category: "technology",
        language: "en",
        country: "us"
    },
    {
        id: "the-wall-street-journal",
        name: "The Wall Street Journal",
        description: "WSJ online coverage of breaking news and current headlines from the US and around the world. Top stories, photos, videos, detailed analysis and in-depth reporting.",
        url: "http://www.wsj.com",
        logo: "https://thesocialinstitute.com/wp-content/uploads/WSJ-logo-square.jpg",
        category: "business",
        language: "en",
        country: "us"
    },
    {
        id: "the-washington-post",
        name: "The Washington Post",
        description: "Breaking news and analysis on politics, business, world national news, entertainment more. In-depth DC, Virginia, Maryland news coverage including traffic, weather, crime, education, restaurant reviews and more.",
        url: "https://www.washingtonpost.com",
        logo: "https://media.glassdoor.com/sqll/1058/the-washington-post-squarelogo-1574698215042.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "time",
        name: "Time",
        description: "Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news.",
        url: "http://time.com",
        logo: "https://api.time.com/wp-content/themes/time2014/img/time-logo-og.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "usa-today",
        name: "USA Today",
        description: "Get the latest national, international, and political news at USATODAY.com.",
        url: "http://www.usatoday.com/news",
        logo: "https://dentistryinsider.tamhsc.edu/wp-content/uploads/2016/04/photo.png",
        category: "general",
        language: "en",
        country: "us"
    },
    {
        id: "wired",
        name: "Wired",
        description: "Wired is a monthly American magazine, published in print and online editions, that focuses on how emerging technologies affect culture, the economy, and politics.",
        url: "https://www.wired.com",
        logo: "https://www.pastbook.com/txt/assets/wired-logo-square-225.jpg",
        category: "technology",
        language: "en",
        country: "us"
    }
]

export default nuesProviders;
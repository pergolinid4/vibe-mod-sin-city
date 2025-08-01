import { StoryData } from '../types';

export const storyData: StoryData = {
  title: "Sin City Noir: The Trembly Murders",
  storyInfo: {
    mapImagePrompt: "A stylized map of Marin County, California, in a noir art style, with key locations highlighted.",
    mapTitle: "Marin County",
    crimeSceneId: "loc-crime-scene-trail",
  },
  characters: [
    {
      id: "char-daisy-trembly",
      name: "Daisy Trembly",
      age: "31",
      occupation: "Residential Real Estate Agent, Marin County",
      imagePrompt: "A petite and graceful woman with black hair pulled back in a loose braid, light freckles, kind dark eyes, and a gentle, sincere smile. She wears neat but unpretentious flats, knit cardigans, and earth tones. She carries herself with quiet poise.",
      description: "Daisy is the daughter of the victims, Tom and Carol Trembly. She is grieving but composed, offering insights into her parents' lives and relationships.",
      role: "witness",
      isSuspect: false,
      connections: {
        relatedPeople: ["char-tom-trembly", "char-carol-trembly", "char-oliver-trembly"],
        knownLocations: ["loc-victim-home", "loc-wild-trail-supply-co"],
        associatedObjects: [],
      },
      testimonyIds: ["testimony-daisy-1"],
      components: [
        {
          type: "socialMedia",
          props: {
            posts: [
              {
                id: "daisy-post-1",
                timestamp: "2025-07-28T10:30:00Z",
                platform: "FaceBook",
                content: "Missing my parents so much today. Every corner of the house reminds me of their laughter and love. 💔 #FamilyForever #GriefJourney",
                likes: 125,
                comments: 15,
                shares: 3,
              },
              {
                id: "daisy-post-2",
                timestamp: "2025-07-25T14:00:00Z",
                platform: "Instagram",
                content: "Just listed this beautiful property in Mill Valley! Who's ready for a fresh start? 🏡✨ #MarinRealEstate #DreamHome",
                imageUrl: "https://via.placeholder.com/400x300?text=Daisy+Listing", // Generic placeholder image URL
                likes: 80,
                comments: 8,
                shares: 1,
              },
            ],
          },
        },
        {
          type: "cctv",
          props: [
            {
              id: "daisy-cctv-1",
              timestamp: "2025-07-29T09:15:00Z",
              locationName: "Wild Trail Supply Co. Entrance",
              videoUrl: "https://example.com/cctv_daisy_wildtrail.mp4", // Placeholder video URL
              description: "Daisy Trembly seen entering Wild Trail Supply Co. the morning after the murders.",
            },
            {
              id: "daisy-cctv-2",
              timestamp: "2025-07-29T11:00:00Z",
              locationName: "Police Station Lobby",
              videoUrl: "https://example.com/cctv_daisy_police.mp4", // Placeholder video URL
              description: "Daisy Trembly arriving at the police station for her statement.",
            },
          ],
        },
        // Add other components like 'phoneLog', 'records', 'file' here as needed
        {
          type: "newsPublication",
          props: {
            newsItems: [
              {
                id: "tom-news-1",
                title: "After 40 Years, Wild Trail Supply Co. Sells to Blue Tag Sporting Goods",
                source: "Marin Outdoor Weekly",
                date: "2025-07-03T00:00:00Z",
                content: "Tom and Carol Trembly, longtime owners of Wild Trail Supply Co., have officially sold their beloved outfitter shop to national chain Blue Tag Sporting Goods. The Tremblys, known for their community involvement and seasonal events, say it was time to step back and enjoy retirement. “We built something we’re proud of,” Tom said. “Now it’s time to pass the torch.”",
              },
              {
                id: "tom-news-2",
                title: "Early Morning Fire Breaks Out at Wild Trail Supply Co.",
                source: "Marin Daily Tribune",
                date: "2025-07-29T00:00:00Z",
                content: "A small fire broke out in the rear storage area of Wild Trail Supply Co. early Tuesday morning. The blaze was contained quickly by Marin FD, with no injuries reported. Owner Tom Trembly credited a passerby for spotting the smoke and called the fire “suspicious.” An investigation is ongoing.",
              },
            ],
          },
        },
      ],
    },
    {
      id: "char-tom-trembly",
      name: "Tom Trembly",
      age: "66",
      occupation: "Retired Owner, Wild Trail Supply Co.",
      imagePrompt: "A towering man with a massive, barrel-chested frame, a burly gut, and a thick beard. He wears flannels, work boots, and jeans, always dusted with sawdust, pollen, or trail dirt.",
      description: "Tom was the patriarch of the Trembly family and co-owner of Wild Trail Supply Co. He was found deceased on a hiking trail.",
      role: "victim",
      isSuspect: false,
      connections: {
        relatedPeople: ["char-carol-trembly", "char-daisy-trembly", "char-oliver-trembly", "char-hank-bassett", "char-peter-lewin"],
        knownLocations: ["loc-victim-home", "loc-wild-trail-supply-co", "loc-crime-scene-trail"],
        associatedObjects: [],
      },
      testimonyIds: [],
      components: [
        {
          type: "socialMedia",
          props: {
            posts: [
              {
                id: "tom-post-1",
                timestamp: "2025-07-01T12:00:00Z",
                platform: "FaceBook",
                content: "After 40 incredible years, Carol and I have decided it’s time to retire. Wild Trail Supply Co. will be in new hands with Blue Tag Sporting Goods. Time to enjoy the next chapter.",
                likes: 350,
                comments: 45,
                shares: 10,
              },
              {
                id: "tom-post-2",
                timestamp: "2025-07-29T09:00:00Z",
                platform: "FaceBook",
                content: "Grateful to the Marin Fire Department for containing the fire. Damage could’ve been much worse. Those responsible will be dealt with.",
                likes: 210,
                comments: 30,
                shares: 5,
              },
              {
                id: "tom-post-3",
                timestamp: "2025-03-12T10:00:00Z",
                platform: "FaceBook",
                content: "Old photo from my Eagle Scout ceremony. Proud of the values that shaped me.",
                likes: 180,
                comments: 20,
                shares: 2,
              },
              {
                id: "tom-post-4",
                timestamp: "2024-12-24T18:00:00Z",
                platform: "FaceBook",
                content: "Santa and Mrs. Claus, 32 years strong. Merry Christmas from the Tremblys.",
                likes: 400,
                comments: 50,
                shares: 12,
              },
            ],
          },
        },
      ],
    },
    {
      id: "char-carol-trembly",
      name: "Carol Trembly",
      age: "63",
      occupation: "Co-Owner, Wild Trail Supply Co. / Local Baker & Gardener",
      imagePrompt: "A small-framed and dainty woman with a light, delicate presence. She wears flowing blouses, linen pants, and handmade jewelry. Her long, silver-gray hair is often tied back loosely.",
      description: "Carol was the co-owner of Wild Trail Supply Co. and Tom's wife. She was found deceased at the bottom of a rocky gorge.",
      role: "victim",
      isSuspect: false,
      connections: {
        relatedPeople: ["char-tom-trembly", "char-daisy-trembly", "char-oliver-trembly", "char-hank-bassett", "char-peter-lewin"],
        knownLocations: ["loc-victim-home", "loc-wild-trail-supply-co", "loc-crime-scene-cliff"],
        associatedObjects: [],
      },
      testimonyIds: [],
      components: [
        {
          type: "socialMedia",
          props: {
            posts: [
              {
                id: "carol-post-1",
                timestamp: "2025-06-15T12:00:00Z",
                platform: "FaceBook",
                content: "Beautiful morning at the Marin Farmers Market. Sold out of zucchini and plum jam by noon! Thank you, neighbors.",
                likes: 150,
                comments: 20,
                shares: 5,
              },
              {
                id: "carol-post-2",
                timestamp: "2025-05-02T10:00:00Z",
                platform: "FaceBook",
                content: "The dahlias are blooming again. Nature knows how to heal us.",
                likes: 180,
                comments: 25,
                shares: 7,
              },
              {
                id: "carol-post-3",
                timestamp: "2025-03-03T17:00:00Z",
                platform: "FaceBook",
                content: "Throwback with Hank Bassett after a long day at the shop. Grateful for the years of friendship and loyalty.",
                imageUrl: "https://via.placeholder.com/400x300?text=Carol+and+Hank", // Generic placeholder image URL for Hank's photo
                likes: 200,
                comments: 30,
                shares: 10,
              },
            ],
          },
        },
        {
          type: "newsPublication",
          props: {
            newsItems: [
              {
                id: "carol-news-1",
                title: "“Heart of the Market”: Carol Trembly’s Holistic Touch Lives On",
                source: "Marin County Living",
                date: "2025-07-10T00:00:00Z",
                content: "Though known to many as co-owner of Wild Trail Supply Co., Carol Trembly carved her own legacy in the community as a gardener, baker, and quiet spiritual force. Her small-batch baked goods and seasonal produce were staples at the local farmer’s market, and many locals credit her warm energy and generosity as reasons they kept returning. “Carol didn’t just sell things,” said one vendor. “She gave people something to look forward to.”",
              },
            ],
          },
        },
        {
          type: "policeReport",
          props: {
            reports: [
              {
                id: "carol-police-report-1",
                date: "2005-08-04T00:00:00Z",
                subject: "Carol Trembly",
                charge: "Possession of marijuana (public use)",
                summary: "Subject was cited by park rangers at Muir Woods National Monument for smoking a marijuana joint in a public area. No resistance or prior offenses noted. Claimed it was “for calming the spirit.” Citation issued and closed without further incident.",
              },
            ],
          },
        },
      ],
    },
    {
      id: "char-oliver-trembly",
      name: "Oliver Trembly",
      age: "34",
      occupation: "Self-described hunting influencer / Sponsored content creator",
      imagePrompt: "A lean man with a long, narrow face and unnaturally pale skin. He wears sleek, branded outdoor gear and has black hair slicked back with deliberate care, sporting a thin, well-maintained mustache.",
      description: "Oliver is the son of Tom and Carol, and a suspect in their murder. He is a hunting influencer with a manipulative personality.",
      role: "suspect",
      isSuspect: false,
      connections: {
        relatedPeople: ["char-tom-trembly", "char-carol-trembly", "char-daisy-trembly"],
        knownLocations: ["loc-oliver-trembly-home"],
        associatedObjects: [],
      },
      testimonyIds: [],
      components: [
        {
          type: "socialMedia",
          props: {
            posts: [
              {
                id: "oliver-post-1",
                timestamp: "2025-07-20T14:00:00Z",
                platform: "Instagram",
                content: "BOOM! Tagged and bagged. Stay quiet, stay deadly.",
                imageUrl: "https://via.placeholder.com/400x300?text=Oliver+Buck", // Generic placeholder image URL
                likes: 1500,
                comments: 250,
                shares: 80,
              },
              {
                id: "oliver-post-2",
                timestamp: "2025-07-15T10:00:00Z",
                platform: "Instagram",
                content: "Who’s your daddy?",
                imageUrl: "https://via.placeholder.com/400x300?text=Oliver+Elk", // Generic placeholder image URL
                likes: 1200,
                comments: 180,
                shares: 60,
              },
              {
                id: "oliver-post-3",
                timestamp: "2025-07-10T09:00:00Z",
                platform: "Instagram",
                content: "Big paws big checks.",
                imageUrl: "https://via.placeholder.com/400x300?text=Oliver+Bear+Paw", // Generic placeholder image URL
                likes: 900,
                comments: 100,
                shares: 40,
              },
              {
                id: "oliver-post-4",
                timestamp: "2025-07-05T16:00:00Z",
                platform: "Instagram",
                content: "Eat clean, shoot dirty. New drop coming soon.",
                imageUrl: "https://via.placeholder.com/400x300?text=Oliver+Crossbow", // Generic placeholder image URL
                likes: 2000,
                comments: 300,
                shares: 100,
              },
              {
                id: "oliver-post-5",
                timestamp: "2025-06-28T11:00:00Z",
                platform: "Instagram",
                content: "Gear that gets you bloody. #WildTrailLegacy",
                videoUrl: "https://via.placeholder.com/400x300?text=Oliver+Gutting+Deer+Video", // Generic placeholder video URL
                likes: 1800,
                comments: 280,
                shares: 90,
              },
            ],
          },
        },
        {
          type: "newsPublication",
          props: {
            newsItems: [
              {
                id: "oliver-news-1",
                title: "The Trophy Clown: How Oliver Trembley Became the Face of Modern Hunting’s Image Problem",
                source: "Bay Area Chronicle",
                date: "2024-04-08T00:00:00Z",
                content: "A scathing op-ed calling out Oliver Trembley for glorifying animal cruelty and toxic behavior in the hunting community. The article references his viral videos, disrespectful treatment of game, and promotion of “kill-shot culture” through social media. Wildlife advocates and veteran hunters alike condemn him as a shallow influencer tarnishing the values of responsible hunting.",
              },
            ],
          },
        },
        {
          type: "policeReport",
          props: {
            reports: [
              {
                id: "oliver-police-report-1",
                date: "2007-01-01T00:00:00Z",
                subject: "Oliver Trembley",
                charge: "Arson (juvenile record, fire set on school property)",
                summary: "Juvenile record for arson.",
              },
              {
                id: "oliver-police-report-2",
                date: "2012-01-01T00:00:00Z",
                subject: "Oliver Trembley",
                charge: "Possession of a controlled substance",
                summary: "Arrested for possession of a controlled substance.",
              },
              {
                id: "oliver-police-report-3",
                date: "2013-01-01T00:00:00Z",
                subject: "Oliver Trembley",
                charge: "Attempted burglary",
                summary: "Arrested for attempted burglary.",
              },
              {
                id: "oliver-police-report-4",
                date: "2014-01-01T00:00:00Z",
                subject: "Oliver Trembley",
                charge: "Firearm possession while on probation",
                summary: "Arrested for firearm possession while on probation.",
              },
              {
                id: "oliver-police-report-5",
                date: "2015-01-01T00:00:00Z",
                subject: "Oliver Trembley",
                charge: "Theft",
                summary: "Arrested for theft.",
              },
              {
                id: "oliver-police-report-6",
                date: "2016-01-01T00:00:00Z",
                subject: "Oliver Trembley",
                charge: "Arson (domestic dispute, fire at ex-girlfriend’s residence)",
                summary: "Arrested for arson (domestic dispute).",
              },
              {
                id: "oliver-police-report-7",
                date: "2017-01-01T00:00:00Z",
                subject: "Oliver Trembley",
                charge: "Resisting arrest",
                summary: "Arrested for resisting arrest.",
              },
              {
                id: "oliver-police-report-8",
                date: "2019-01-01T00:00:00Z",
                subject: "Oliver Trembley",
                charge: "Drug and weapons possession (3-year sentence)",
                summary: "Arrested for drug and weapons possession, served 3-year sentence.",
              },
            ],
          },
        },
      ],
    },
    {
      id: "char-peter-lewin",
      name: "Peter Lewin",
      age: "40",
      occupation: "Firewatch Ranger, Marin County Department of Forestry",
      imagePrompt: "A physically imposing man at 6'4\" with a broad-shouldered, well-conditioned build. He wears practical outdoor gear and often smells faintly of pine and smoke. Keeps his hair short, with a week’s worth of stubble.",
      description: "Peter is a firewatch ranger and a suspect in the Trembly murders. He is emotionally volatile and defensive.",
      role: "suspect",
      isSuspect: false,
      connections: {
        relatedPeople: ["char-tom-trembly", "char-carol-trembly"],
        knownLocations: ["loc-firewatch-tower-lookout-6"],
        associatedObjects: [],
      },
      testimonyIds: [],
      components: [
        {
          type: "socialMedia",
          props: {
            posts: [
              {
                id: "peter-post-1",
                timestamp: "2025-06-15T12:00:00Z",
                platform: "Instagram",
                content: "Beautiful morning at the Marin Farmers Market. Sold out of zucchini and plum jam by noon! Thank you, neighbors.",
                likes: 150,
                comments: 20,
                shares: 5,
              },
              {
                id: "peter-post-2",
                timestamp: "2025-05-02T10:00:00Z",
                platform: "Instagram",
                content: "The dahlias are blooming again. Nature knows how to heal us.",
                likes: 180,
                comments: 25,
                shares: 7,
              },
              {
                id: "peter-post-3",
                timestamp: "2025-03-03T17:00:00Z",
                platform: "Instagram",
                content: "Throwback with Hank Bassett after a long day at the shop. Grateful for the years of friendship and loyalty.",
                imageUrl: "https://via.placeholder.com/400x300?text=Peter+and+Hank", // Generic placeholder image URL for Hank's photo
                likes: 200,
                comments: 30,
                shares: 10,
              },
            ],
          },
        },
        {
          type: "newsPublication",
          props: {
            newsItems: [
              {
                id: "peter-news-1",
                title: "“Watching the Flames: The Isolated Life of a Firewatch Ranger”",
                source: "Marin Outdoor Weekly",
                date: "2023-06-12T00:00:00Z",
                content: "A human interest piece featuring Peter Lewin, one of Marin County’s few remaining firewatch rangers. The article explores the solitary, demanding nature of the job and highlights Peter’s deep familiarity with the terrain. Briefly mentions his military past and notes that he requested reassignment to this post to 'stay away from people.'",
              },
            ],
          },
        },
        {
          type: "cctv",
          props: [
            {
              id: "peter-cctv-1",
              timestamp: "2025-07-10T15:42:00Z",
              locationName: "Ridge Trailhead",
              videoUrl: "https://via.placeholder.com/400x300?text=Peter+CCTV+Ridge+Video", // Generic placeholder video URL
              description: "Peter checks trail cam mounted near ridge trailhead. Adjusts lens, scans area, then moves on.",
            },
            {
              id: "peter-cctv-2",
              timestamp: "2025-07-24T15:38:00Z",
              locationName: "Switchback Turn",
              videoUrl: "https://via.placeholder.com/400x300?text=Peter+CCTV+Switchback+Video", // Generic placeholder video URL
              description: "Peter inspects cam overlooking switchback turn. Cleans lens and logs timestamp.",
            },
            {
              id: "peter-cctv-3",
              timestamp: "2025-08-07T15:47:00Z",
              locationName: "Base Station Cam",
              videoUrl: "https://via.placeholder.com/400x300?text=Peter+CCTV+Base+Video", // Generic placeholder video URL
              description: "Peter reviews footage at base station cam. Alone, focused, visible in frame for several minutes.",
            },
          ],
        },
        {
          type: "policeReport",
          props: {
            reports: [
              {
                id: "peter-police-report-1",
                date: "2011-06-02T00:00:00Z",
                subject: "Peter Lewin",
                charge: "Driving Under the Influence (First Offense)",
                summary: "Subject was pulled over near Shoreline Highway after swerving and failing to signal. Administered field sobriety tests and registered a BAC of 0.11. Cooperated with officers. Vehicle impounded. Released on bail the following morning. Disposition: Guilty plea. Fined and ordered to complete a court-approved alcohol education program. License suspended for 6 months.",
              },
            ],
          },
        },
      ],
    },
    {
      id: "char-hank-bassett",
      name: "Hank Bassett",
      age: "51",
      occupation: "Former Senior Sales Associate, Wild Trail Supply Co.",
      imagePrompt: "A lean and weathered man with a wiry frame, worn denim, old flannel layers, and sun-bleached work boots. His long, unkempt hair falls to his shoulders, and a full gray-streaked beard masks most of his expression.",
      description: "Hank is a former employee of Wild Trail Supply Co. and a suspect in the Trembly murders. He is abrasive and bitter.",
      role: "suspect",
      isSuspect: false,
      connections: {
        relatedPeople: ["char-tom-trembly", "char-carol-trembly"],
        knownLocations: ["loc-hank-bassetts-cabin", "loc-wild-trail-supply-co"],
        associatedObjects: [],
      },
      testimonyIds: [],
      components: [
        {
          type: "policeReport",
          props: {
            reports: [
              {
                id: "hank-police-report-1",
                date: "1996-10-18T00:00:00Z",
                subject: "Hank Bassett",
                charge: "Disturbing the peace",
                summary: "Hank Bassett was involved in a physical altercation at a local bar after an argument escalated over a pool game. Witnesses say Bassett threw the first punch. No major injuries reported. Both parties charged with disturbing the peace. Case closed with a fine and court-ordered anger management.",
              },
              {
                id: "hank-police-report-2",
                date: "1999-07-02T00:00:00Z",
                subject: "Hank Bassett",
                charge: "Confrontation with vendor",
                summary: "Bassett was detained after a confrontation with a vendor turned physical. Dispute involved a refund over faulty hunting gear. Minor scuffle broke out; no formal charges pressed after the vendor declined to pursue. Warning issued.",
              },
              {
                id: "hank-police-report-3",
                date: "2018-08-23T00:00:00Z",
                subject: "Hank Bassett",
                charge: "Aggravated Assault",
                summary: "Hank Bassett was arrested following a physical altercation with a fellow hunter at a local firearm auction. Witnesses say the argument began over a disputed rifle bid and quickly escalated. Bassett struck the man with a metal folding chair, causing minor head injuries. Charged with aggravated assault. Served 3 months in county jail as part of a plea deal.",
              },
            ],
          },
        },
      ],
    },
    {
      id: "char-kermit-the-hermit",
      name: "Kermit the Hermit",
      age: "Mid-to-late 60s",
      occupation: "Unemployed / Off-grid resident of the Marin backcountry",
      imagePrompt: "A lean and wiry man with deeply tanned, weathered skin. His white hair is knotted into long, uneven dreadlocks, and his beard is even longer. Wears layered clothing in clashing colors.",
      description: "Kermit is an eccentric off-grid resident who witnessed part of the crime.",
      role: "witness",
      isSuspect: false,
      connections: {
        relatedPeople: [],
        knownLocations: ["loc-crime-scene-open-area"],
        associatedObjects: [],
      },
      testimonyIds: ["testimony-kermit-1"],
      components: [],
    },
  ],
  objects: [
    {
      id: "obj-placeholder-1",
      name: "Placeholder Object",
      imagePrompt: "A generic placeholder image.",
      description: "This is a placeholder object.",
      timestamp: "2025-07-29T08:00:00Z",
      isEvidence: false,
      assignedToSuspectIds: [],
      locationFoundId: "loc-crime-scene-trail",
      rarity: "irrelevant",
      category: "physical",
      costToUnlock: 0,
      components: [],
    },
  ],
  locations: [
    {
      id: "loc-crime-scene-trail",
      name: "Crime Scene - Trail",
      imagePrompt: "A remote hiking trail in the Marin woods, with blood on the dirt path and drag marks.",
      description: "The location where Tom Trembly's body was found.",
      hotspots: [],
      mapCoords: { top: "25%", left: "40%" },
      lastEventTimestamp: "2025-07-29T07:30:00Z",
      lastEventDescription: "Tom Trembly's body discovered.",
    },
    {
      id: "loc-crime-scene-cliff",
      name: "Crime Scene - Cliff",
      imagePrompt: "A steep gorge with rocks below, where Carol Trembly's body lies.",
      description: "The location where Carol Trembly's body was found.",
      hotspots: [],
      mapCoords: { top: "35%", left: "65%" },
      lastEventTimestamp: "2025-07-29T07:45:00Z",
      lastEventDescription: "Carol Trembly's body discovered.",
    },
    {
      id: "loc-crime-scene-blind",
      name: "Crime Scene - Blind",
      imagePrompt: "A small hunter’s perch camouflaged with leaves and brush, with a view of the trail.",
      description: "A hunter's blind near the crime scene.",
      hotspots: [],
      mapCoords: { top: "15%", left: "25%" },
      lastEventTimestamp: "2025-07-29T07:00:00Z",
      lastEventDescription: "Potential vantage point for the shooter.",
    },
    {
      id: "loc-crime-scene-open-area",
      name: "Crime Scene - Open Area",
      imagePrompt: "A hilltop clearing overlooking the crime scene.",
      description: "The location where Kermit the Hermit observed the scene.",
      hotspots: [],
      mapCoords: { top: "45%", left: "80%" },
      lastEventTimestamp: "2025-07-29T07:10:00Z",
      lastEventDescription: "Kermit's observation point.",
    },
    {
      id: "loc-victim-home",
      name: "Victim Home",
      imagePrompt: "Tom and Carol’s rural house, filled with personal touches and history.",
      description: "The home of Tom and Carol Trembly.",
      hotspots: [],
      mapCoords: { top: "55%", left: "15%" },
      lastEventTimestamp: "2025-07-28T20:00:00Z",
      lastEventDescription: "Last known activity at the Trembly residence.",
    },
    {
      id: "loc-wild-trail-supply-co",
      name: "Wild Trail Supply Co.",
      imagePrompt: "The recently sold outdoor supply shop, with shelves of gear and old sales posters.",
      description: "The outdoor supply store formerly owned by Tom and Carol Trembly.",
      hotspots: [],
      mapCoords: { top: "65%", left: "45%" },
      lastEventTimestamp: "2025-07-27T17:00:00Z",
      lastEventDescription: "Last day of business under Trembly ownership.",
    },
    {
      id: "loc-oliver-trembly-home",
      name: "Oliver Trembly's Home",
      imagePrompt: "A messy, semi-rural house, with hunting trophies and weapons lining the walls.",
      description: "The residence of Oliver Trembly.",
      hotspots: [],
      mapCoords: { top: "75%", left: "5%" },
      lastEventTimestamp: "2025-07-29T06:00:00Z",
      lastEventDescription: "Oliver Trembly's last known location before police contact.",
    },
    {
      id: "loc-firewatch-tower-lookout-6",
      name: "Firewatch Tower - Lookout 6",
      imagePrompt: "An isolated firewatch tower surrounded by thick forest, with an elevated view.",
      description: "Peter Lewin's firewatch tower.",
      hotspots: [],
      mapCoords: { top: "85%", left: "70%" },
      lastEventTimestamp: "2025-07-29T07:00:00Z",
      lastEventDescription: "Peter Lewin on duty.",
    },
    {
      id: "loc-hank-bassetts-cabin",
      name: "Hank Bassett's Cabin",
      imagePrompt: "An off-grid property tucked into the woods, with a woodpile and burnt trash can outside.",
      description: "Hank Bassett's secluded cabin.",
      hotspots: [],
      mapCoords: { top: "95%", left: "35%" },
      lastEventTimestamp: "2025-07-29T05:00:00Z",
      lastEventDescription: "Hank Bassett's last known location before police contact.",
    },
    {
      id: "loc_interrogation_room",
      name: "Interrogation Room",
      imagePrompt: "A small, windowless room with a table, two chairs, and a recorder.",
      description: "A generic interrogation room at the police station.",
      hotspots: [],
      mapCoords: { top: "0%", left: "0%" }, // Not visible on map
      lastEventTimestamp: "",
      lastEventDescription: "",
      isInternal: true,
    },
  ],
  evidenceGroups: [],
  testimonies: [
    {
      id: "testimony-daisy-1",
      title: "Daisy Trembly's Initial Statement",
      content: "Daisy provided an initial statement regarding her parents' relationships and recent events.",
      sourceCharacterId: "char-daisy-trembly",
    },
    {
      id: "testimony-kermit-1",
      title: "Kermit the Hermit's Witness Account",
      content: "Kermit described hearing a shot and a scream, and seeing a man at the cliff's edge.",
      sourceCharacterId: "char-kermit-the-hermit",
    },
  ],
  canonicalTimeline: {
    culpritId: "char-hank-bassett", // Placeholder for now
    keyEvents: [],
  },
  evidenceStacks: [],
  bounties: [],
};
export const projects: Record<string, {
    slug: string;
    title: string;
    category: string;
    location: string;
    year: string;
    description: string;
    heroImage: string;
    images: string[];
    plans: string[];
    sections: {
        title: string;
        content: string;
        image?: string;
    }[];
    size?: string;
}> = {
    "bangalore-fusion-villa": {
        slug: "bangalore-fusion-villa",
        title: "Bangalore Fusion Villa",
        category: "Residential",
        location: "Bangalore, India",
        year: "2024",
        description: "A dialogue between the brutalist strength of exposed concrete and the warmth of traditional Chettinad timber columns. This residence is designed around a central living courtyard that acts as the lungs of the house.",
        heroImage: "/bangalore_villa_facade_color_1767792911832.png",
        images: [
            "/bangalore_villa_facade_color_1767792911832.png",
            "/bangalore_villa_bedroom_color_1767792889582.png",
            "/bangalore_villa_kitchen_color_1767792872338.png",
            "/bangalore_villa_bathroom_skylight_color_1767792931406.png",
            "/slider_bangalore_fusion_villa_1767686574598.png"
        ],
        plans: [],
        sections: [
            {
                title: "The Design Language",
                content: "The architectural language is a study in contrasts. Raw, exposed concrete walls provide a modern, robust shell, while reclaimed Chettinad pillars introduce a layer of history and intricacy. This fusion creates a space that feels both grounded and ethereal.",
                image: "/bangalore_villa_facade_color_1767792911832.png"
            },
            {
                title: "Interior & Materiality",
                content: "Inside, the focus is on texture and light. Athangudi tiles in muted earth tones ground the spaces, while the double-height volumes allow natural light to wash over the textured concrete surfaces. The furniture is minimal, allowing the architecture to take center stage.",
                image: "/bangalore_villa_bedroom_color_1767792889582.png"
            },
            {
                title: "Courtyard Living",
                content: "Central to the home's organisation is the open-to-sky courtyard. It regulates the microclimate, bringing in cool air and diffusing sunlight. It serves as the visual and spiritual heart of the home, connecting the private and public zones.",
                image: "/bangalore_villa_kitchen_color_1767792872338.png"
            }
        ],
    },
    "kerala-eco-resort": {
        slug: "kerala-eco-resort",
        title: "Kerala Eco-Resort",
        category: "Hospitality",
        location: "Munnar, Kerala",
        year: "2023",
        description: "Nestled in the backwaters, this resort minimises its carbon footprint through the use of locally sourced laterite and bamboo. The design blurs the boundaries between the built form and the water.",
        heroImage: "/kerala_resort_slider_colorized_1767793672440.png",
        images: [
            "/kerala_resort_pool_colorized_v2_1767794309819.png",
            "/kerala_resort_reception_colorized_v2_1767794334436.png",
            "/kerala_resort_bathroom_colorized_v2_1767794366826.png",
            "/kerala_resort_restaurant_colorized_v2_1767794399155.png",
            "/kerala_resort_aerial_colorized_1767793602663.png",
            "/kerala_resort_bedroom_colorized_1767793625502.png",
            "/kerala_resort_night_replacement_1767794619605.png",
            "/kerala_resort_walkway_colorized_1767793650889.png",
            "/kerala_resort_yoga_colorized_v2_1767794447655.png",
            "/kerala_resort_slider_colorized_1767793672440.png"
        ],
        plans: [],
        sections: [
            {
                title: "Vernacular Modernism",
                content: "Drawing inspiration from traditional Kerala architecture, the resort utilises steep sloping roofs and deep overhangs to combat the heavy monsoons. However, these traditional forms are reinterpreted with a clean, modern minimalist aesthetic.",
                image: "/kerala_resort_aerial_colorized_1767793602663.png"
            },
            {
                title: "Sustainable Luxury",
                content: "Luxury here is defined by space and silence. The open-to-sky bathrooms maximise the connection to the tropical elements, while the infinity pool acts as a seamless extension of the backwaters.",
                image: "/kerala_resort_bathroom_colorized_v2_1767794366826.png"
            },
            {
                title: "Material Palette",
                content: "The primary materials are locally sourced laterite stone and bamboo. This not only reduces the carbon footprint but also allows the buildings to age graciously, blending into the landscape over time.",
                image: "/kerala_resort_reception_colorized_v2_1767794334436.png"
            }
        ],
    },
    "chennai-tech-hub": {
        slug: "chennai-tech-hub",
        title: "Chennai Tech Hub",
        category: "Commercial",
        location: "Chennai, Tamil Nadu",
        year: "2025",
        description: "A sustainable workspace designed for the digital age. Vertical gardens wrapped around the concrete facade provide thermal insulation and improve air quality in the urban context.",
        heroImage: "/portfolio_chennai_office_sustainable_1767686592674.png",
        images: [
            "/chennai_office_atrium_1767693827347.png",
            "/chennai_office_facade_detail_1767693844620.png",
            "/chennai_office_rooftop_garden_1767693861694.png",
            "/chennai_cafeteria_colorized_1767795152837.png",
            "/chennai_facade_night_colorized_1767795174827.png",
            "/chennai_lobby_art_colorized_1767855782255.png",
            "/chennai_meeting_pod_colorized_1767855802746.png",
            "/chennai_biophilic_colorized_1767855835687.png",
            "/hero_slideshow_chennai_minimal_1767686629299.png"
        ],
        plans: [],
        sections: [
            {
                title: "Biophilic Design",
                content: "The design philosophy centres on biophilia — the innate human connection to nature. Green walls, indoor planters, and natural light are integral to the workspace, proven to enhance well-being and productivity.",
                image: "/chennai_biophilic_colorized_1767855835687.png"
            },
            {
                title: "The Social Heart",
                content: "At the core of the building is a soaring atrium that fosters interaction and collaboration. This communal space is designed to be the social heart of the office, encouraging spontaneous meetings and innovation.",
                image: "/chennai_office_atrium_1767693827347.png"
            },
            {
                title: "Facade Strategy",
                content: "The facade is a living skin. The vertical gardens not only provide a striking visual identity but also act as a natural cooling system, significantly reducing the building's energy consumption.",
                image: "/chennai_facade_night_colorized_1767795174827.png"
            }
        ],
    },
    "chettinad-conservation": {
        slug: "chettinad-conservation",
        title: "Chettinad Conservation",
        category: "Conservation",
        location: "Karaikudi, Tamil Nadu",
        year: "2022",
        description: "Restoration of a 19th-century heritage home. We carefully preserved the original limestone plaster and woodwork while introducing modern amenities in a sensitive glass extension.",
        heroImage: "/portfolio_tamilnadu_heritage_fusion_1767686610582.png",
        images: [
            "/chettinad_hero_fusion_1767964209108.png",
            "/chettinad_courtyard_colorized_1767964112792.png",
            "/chettinad_bedroom_colorized_1767964135344.png",
            "/chettinad_dining_colorized_1767964163160.png",
            "/chettinad_terrace_colorized_1767964188693.png"
        ],
        plans: [],
        sections: [
            {
                title: "Restoration Philosophy",
                content: "Our approach was 'minimum intervention, maximum impact'. We painstakingly restored the existing Athangudi tiles and teak columns, using traditional techniques to ensure authenticity.",
                image: "/chettinad_courtyard_pillars_1767774551710.png"
            },
            {
                title: "Contemporary Injections",
                content: "To adapt the home for modern living, we introduced a minimalist glass box that houses the new kitchen and dining areas. This clear distinction between old and new highlights the beauty of both.",
                image: "/chettinad_glass_walkway_1767774624897.png"
            },
            {
                title: "Interior Atmosphere",
                content: "The interiors are moody and cinematic. We embraced the deep shadows and dramatic light that characterise traditional Chettinad architecture, enhancing them with carefully curated antique pieces.",
                image: "/chettinad_dining_hall_1767774723957.png"
            }
        ],
        size: "1,800 sq ft"
    },
    "chennai-urban-residence": {
        slug: "chennai-urban-residence",
        title: "Chennai Urban Residence",
        category: "Residential",
        location: "Chennai, India",
        year: "2025",
        description: "A contemporary 2-floor residence designed for a young IT couple with a child in urban Chennai. The project reimagines conventional construction with bold design gestures, optimising space for modern work-from-home lifestyles.",
        heroImage: "/chennai_urban_residence_exterior_1769688810297.png",
        images: [
            "/chennai_urban_residence_exterior_1769688810297.png",
            "/chennai_residence_facade_detail_1769692207613.png",
            "/chennai_residence_entrance_1769692162126.png",
            "/chennai_residence_living_room_1769688835282.png",
            "/chennai_residence_dining_1769689928503.png",
            "/chennai_residence_kitchen_detail_1769692185659.png",
            "/chennai_residence_workspace_1769688853632.png",
            "/chennai_residence_bedroom_1769688873885.png",
            "/chennai_residence_bathroom_1769692112666.png",
            "/chennai_residence_kids_room_1769689883554.png",
            "/chennai_residence_pooja_room_1769689906025.png",
            "/chennai_residence_terrace_1769692133375.png",
            "/chennai_residence_staircase_1769688893581.png"
        ],
        plans: [],
        sections: [
            { title: "Urban Context", content: "Situated in a dense residential neighbourhood in Chennai, this 2-floor home responds to the urban fabric while asserting its contemporary identity.", image: "/chennai_urban_residence_exterior_1769688810297.png" },
            { title: "Facade Design", content: "The exterior combines textured concrete panels with warm wooden slats, creating visual rhythm and depth. The cantilevered balcony adds architectural drama while providing outdoor living space.", image: "/chennai_residence_facade_detail_1769692207613.png" },
            { title: "Living Spaces", content: "The double-height living room forms the social heart of the home. Warm wooden accents complement the minimal contemporary aesthetic, while abundant natural light creates a sense of spaciousness.", image: "/chennai_residence_living_room_1769688835282.png" },
            { title: "Master Bedroom", content: "The master bedroom embraces Japanese-inspired minimalism with a low platform bed, wooden flooring, and a direct connection to a private terrace with lush greenery.", image: "/chennai_residence_bedroom_1769688873885.png" },
            { title: "Rooftop Terrace", content: "The rooftop terrace transforms the compact urban plot into a private oasis. Wooden decking, concrete planters, and string lighting create an outdoor living room with city views.", image: "/chennai_residence_terrace_1769692133375.png" }
        ],
        size: "1,200 sq ft"
    },
    "compact-urban-apartments": {
        slug: "compact-urban-apartments",
        title: "Compact Urban Apartments",
        category: "Residential",
        location: "Chennai, India",
        year: "2025",
        description: "A Joint Venture multi-family residential building addressing Chennai's affordable housing needs on a constrained 2,800 sq ft urban plot. The project employs tropical modernism with terracotta jali screens, passive ventilation strategies, and integrated greenery.",
        heroImage: "/chennai_apartments_exterior_v2_1769753645940.png",
        images: [
            "/chennai_apartments_exterior_v2_1769753645940.png",
            "/chennai_apartments_parking_1769753661711.png",
            "/chennai_apartments_staircase_1769753677802.png",
            "/chennai_apartments_living_1769753696485.png",
            "/chennai_apartments_bedroom_1769753714816.png",
            "/chennai_apartments_kitchen_1769753735185.png"
        ],
        plans: [],
        sections: [
            { title: "Building Strategy", content: "The 4-story structure maximises plot efficiency with ground floor entirely dedicated to resident parking. Three identical residential floors sit above, each with two mirrored 700 sq ft apartments.", image: "/chennai_apartments_exterior_v2_1769753645940.png" },
            { title: "Shared Circulation", content: "A modest central staircase serves all six units. Terracotta accent walls match the building's exterior palette while skylights bring natural daylight deep into the circulation core.", image: "/chennai_apartments_staircase_1769753677802.png" },
            { title: "Apartment Living", content: "Compact 700 sq ft apartments maximise perceived space through thoughtful design. The signature jali screens filter harsh sunlight while maintaining visual connection to balconies.", image: "/chennai_apartments_living_1769753696485.png" }
        ],
        size: "2,800 sq ft plot, 6 units"
    }
};

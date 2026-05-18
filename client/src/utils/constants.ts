export const HERO_TEXTS = {
    HOME: {
        hero: {
            // Heading: "Private Home Elevators Designed for Luxury Villas in the UAE",
            // highlightedText: "Elevation",
            subHeading: "Smart home lift solutions designed for comfort, safety, \nand seamless everyday movement.",
            buttonText: "Get a free quote",
        },
    },
    CAR: {
        hero: {
            Heading: "Smart lift for smarter",
            highlightedText: "building",
            subHeading: "Smart lift solution for business environment.",
            buttonText: "Get a free quote",
        },
    },
    PASSENGER_ELEVATOR: {
        hero: {
            Heading: "Engineered for",
            highlightedText: "Seamless Travel",
            subHeading:
                "Smooth, Safe, and Customized to Your Building's Unique Character.",
            buttonText: "Get a free quote",
        },
    },
};

interface Segment {
    text: string;
    color: "dark" | "gold" | "muted";
    imageSrc?: string; // image shown BEFORE this segment
    imageAfter?: boolean; // if true, image comes AFTER segment text
}

interface Line {
    segments: Segment[];
    direction: "left" | "right"; // scroll direction on reveal
}

export const STATS = [
    { number: "100+", label: "Projects Delivered" },
    { number: "500+", label: "Design Variations" },
    { number: "10+", label: "Years of Industry Expertise" },
    { number: "15+", label: "Trusted Suppliers & Partners" },
];

export const SCROLLING_TEXT = {
    HOME: [
        {
            direction: "left",
            segments: [
                {
                    text: "BEFORE YOU INSTALL",
                    color: "dark",
                    imageSrc: "/images/Rectangle 75.png",
                    imageAfter: false,
                },
            ],
        },
        {
            direction: "right",
            segments: [
                { text: "LIFTS, ", color: "dark" },
                { text: "BUILD", color: "gold" },
                {
                    text: " THE",
                    color: "dark",
                    imageAfter: true,
                    imageSrc: "/images/Rectangle 76.png",
                },
            ],
        },
        {
            direction: "left",
            segments: [{ text: "SYSTEM — SAFETY,", color: "muted" }],
        },
        {
            direction: "right",
            segments: [
                {
                    text: "PERFORMANCE, AND",
                    color: "muted",
                    imageSrc: "/images/Rectangle 77.png",
                    imageAfter: false,
                },
            ],
        },
        {
            direction: "left",
            segments: [
                {
                    text: "PRECISION.",
                    color: "muted",
                    imageAfter: true,
                    imageSrc: "/images/Rectangle 78.png",
                },
            ],
        },
    ],
    CAR: [
        {
            direction: "left",
            segments: [
                {
                    text: "BEFORE YOU INSTALL",
                    color: "dark",
                    imageSrc: "/images/Rectangle 75.png",
                    imageAfter: false,
                },
            ],
        },
        {
            direction: "right",
            segments: [
                { text: "LIFTS, ", color: "dark" },
                { text: "BUILD", color: "gold" },
                {
                    text: " THE",
                    color: "dark",
                    imageAfter: true,
                    imageSrc: "/images/Rectangle 76.png",
                },
            ],
        },
        {
            direction: "left",
            segments: [{ text: "SYSTEM — SAFETY,", color: "muted" }],
        },
        {
            direction: "right",
            segments: [
                {
                    text: "PERFORMANCE, AND",
                    color: "muted",
                    imageSrc: "/images/Rectangle 77.png",
                    imageAfter: false,
                },
            ],
        },
        {
            direction: "left",
            segments: [
                {
                    text: "PRECISION.",
                    color: "muted",
                    imageAfter: true,
                    imageSrc: "/images/Rectangle 78.png",
                },
            ],
        },
    ],
    PASSENGER_ELEVATOR: [
        {
            direction: "left",
            segments: [
                {
                    text: "BEFORE YOU INSTALL",
                    color: "dark",
                    imageSrc: "/images/Rectangle 75.png",
                    imageAfter: false,
                },
            ],
        },
        {
            direction: "right",
            segments: [
                { text: "LIFTS, ", color: "dark" },
                { text: "BUILD", color: "gold" },
                {
                    text: " THE",
                    color: "dark",
                    imageAfter: true,
                    imageSrc: "/images/Rectangle 76.png",
                },
            ],
        },
        {
            direction: "left",
            segments: [{ text: "SYSTEM — SAFETY,", color: "muted" }],
        },
        {
            direction: "right",
            segments: [
                {
                    text: "PERFORMANCE, AND",
                    color: "muted",
                    imageSrc: "/images/Rectangle 77.png",
                    imageAfter: false,
                },
            ],
        },
        {
            direction: "left",
            segments: [
                {
                    text: "PRECISION.",
                    color: "muted",
                    imageAfter: true,
                    imageSrc: "/images/Rectangle 78.png",
                },
            ],
        },
    ],
};

export const PREDEFINE = {
    HOME: [
        {
            title: "Luxury Home Lift",
            subtitle: "Elevate your home with seamless style",
            image: "/images/prebg.png",
        },
    ],
    CAR: [
        {
            title: "Hydraulic Car Lift",
            subtitle: "Robust and reliable",
            image: "/images/car1.png",
        },
    ],
    PASSENGER_ELEVATOR: [
        {
            title: "Panoramic Glass Lift",
            subtitle: "360-degree views",
            image: "/images/pass1.jpg",
        },
    ],
};

export const CAROUSEL = {
    HOME: {
        REELS: [
            {
                id: 1,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r1.jpg",
            },
            {
                id: 2,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r2.jpg",
            },
            {
                id: 3,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r3.jpg",
            },
            {
                id: 4,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r4.jpg",
            },
            {
                id: 5,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r4.jpg",
            },
            {
                id: 6,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/t1.jpg",
            },
            {
                id: 7,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r1.jpg",
            },
            {
                id: 8,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r2.jpg",
            },
        ],
    },
    CAR: {
        REELS: [
            {
                id: 1,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r1.jpg",
            },
            {
                id: 2,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r2.jpg",
            },
            {
                id: 3,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r3.jpg",
            },
            {
                id: 4,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r4.jpg",
            },
            {
                id: 5,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r4.jpg",
            },
            {
                id: 6,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/t1.jpg",
            },
            {
                id: 7,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r1.jpg",
            },
            {
                id: 8,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r2.jpg",
            },
        ],
    },
    PASSENGER_ELEVATOR: {
        REELS: [
            {
                id: 1,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r1.jpg",
            },
            {
                id: 2,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r2.jpg",
            },
            {
                id: 3,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r3.jpg",
            },
            {
                id: 4,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r4.jpg",
            },
            {
                id: 5,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r4.jpg",
            },
            {
                id: 6,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/t1.jpg",
            },
            {
                id: 7,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r1.jpg",
            },
            {
                id: 8,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                poster: "/images/r2.jpg",
            },
        ],
    },
};

export const TESTIMONIAL = {
    HOME: {
        DATA: [
            {
                id: 1,
                name: "John Doe",
                role: "CEO",
                avatar: "/images/t1.jpg",
                content: "This product is amazing! It has changed my life.",
            },
            {
                id: 2,
                name: "Jane Smith",
                role: "Designer",
                avatar: "/images/t2.jpg",
                content: "I love this product! It's so easy to use.",
            },
            {
                id: 3,
                name: "Bob Johnson",
                role: "Engineer",
                avatar: "/images/t3.jpg",
                content: "This product is great! It's very reliable.",
            },
            {
                id: 4,
                name: "Alice Williams",
                role: "Manager",
                avatar: "/images/t4.jpg",
                content: "This product is fantastic! It's very efficient.",
            },
            {
                id: 5,
                name: "David Brown",
                role: "Developer",
                avatar: "/images/t4.jpg",
                content: "This product is wonderful! It's very user-friendly.",
            },
            {
                id: 6,
                name: "Emily Davis",
                role: "Analyst",
                avatar: "/images/t2.jpg",
                content: "This product is superb! It's very versatile.",
            },
        ],
    },
    CAR: {
        DATA: [
            {
                id: 1,
                name: "John Doe",
                role: "CEO",
                avatar: "/images/t1.jpg",
                content: "This product is amazing! It has changed my life.",
            },
            {
                id: 2,
                name: "Jane Smith",
                role: "Designer",
                avatar: "/images/t2.jpg",
                content: "I love this product! It's so easy to use.",
            },
            {
                id: 3,
                name: "Bob Johnson",
                role: "Engineer",
                avatar: "/images/t3.jpg",
                content: "This product is great! It's very reliable.",
            },
            {
                id: 4,
                name: "Alice Williams",
                role: "Manager",
                avatar: "/images/t4.jpg",
                content: "This product is fantastic! It's very efficient.",
            },
            {
                id: 5,
                name: "David Brown",
                role: "Developer",
                avatar: "/images/t5.jpg",
                content: "This product is wonderful! It's very user-friendly.",
            },
            {
                id: 6,
                name: "Emily Davis",
                role: "Analyst",
                avatar: "/images/t6.jpg",
                content: "This product is superb! It's very versatile.",
            },
        ],
    },
    PASSENGER_ELEVATOR: {
        DATA: [
            {
                id: 1,
                name: "John Doe",
                role: "CEO",
                avatar: "/images/t1.jpg",
                content: "This product is amazing! It has changed my life.",
            },
            {
                id: 2,
                name: "Jane Smith",
                role: "Designer",
                avatar: "/images/t2.jpg",
                content: "I love this product! It's so easy to use.",
            },
            {
                id: 3,
                name: "Bob Johnson",
                role: "Engineer",
                avatar: "/images/t3.jpg",
                content: "This product is great! It's very reliable.",
            },
            {
                id: 4,
                name: "Alice Williams",
                role: "Manager",
                avatar: "/images/t4.jpg",
                content: "This product is fantastic! It's very efficient.",
            },
            {
                id: 5,
                name: "David Brown",
                role: "Developer",
                avatar: "/images/t5.jpg",
                content: "This product is wonderful! It's very user-friendly.",
            },
            {
                id: 6,
                name: "Emily Davis",
                role: "Analyst",
                avatar: "/images/t6.jpg",
                content: "This product is superb! It's very versatile.",
            },
        ],
    },
};

// lifts types data
export type LandingType = keyof typeof HERO_TEXTS;
export const CURRENT_THEME: LandingType = "HOME";

export const LIFT_DATA: Record<
    LandingType,
    {
        type: string;
        titleGold: string;
        titleWhite: string;
        description: string;
        imageSrc: string;
        imageAlt: string;
    }[]
> = {
    HOME: [
        {
            type: "TYPE 01",
            titleGold: "Passenger",
            titleWhite: "Lift",
            description:
                "Designed For Smooth And Efficient Movement Of People In Commercial Buildings Like Offices, Malls, And Hotels. Ensures Comfort, Safety, And High Performance During Peak Hours.",
            imageSrc: "/images/p.jpeg",
            imageAlt: "Passenger Lift",
        },
        {
            type: "TYPE 02",
            titleGold: "Freight",
            titleWhite: "Elevator",
            description:
                "Built To Transport Heavy Goods And Industrial Cargo Across Multiple Floors. Robust Construction Ensures Durability, Load Stability, And Safe Operation In Demanding Environments.",
            imageSrc: "/images/h.jpeg",
            imageAlt: "Freight Elevator",
        },
        {
            type: "TYPE 03",
            titleGold: "Panoramic",
            titleWhite: "Lift",
            description:
                "Offers Stunning 360° Views Through Glass Enclosures, Perfect For Luxury Hotels, Malls, And High-End Residences. Combines Aesthetic Appeal With Smooth, Silent Operation.",
            imageSrc: "/images/p.jpeg",
            imageAlt: "Panoramic Lift",
        },
        {
            type: "TYPE 04",
            titleGold: "Home",
            titleWhite: "Elevator",
            description:
                "Compact And Elegant Solution For Residential Spaces. Designed To Fit Seamlessly Into Home Interiors While Providing Safe, Quiet, And Reliable Vertical Transportation.",
            imageSrc: "/images/h.jpeg",
            imageAlt: "Home Elevator",
        },
    ],
    CAR: [
        {
            type: "TYPE 01",
            titleGold: "Hydraulic",
            titleWhite: "Car Lift",
            description:
                "Reliable lifting with advanced hydraulic systems, ideal for garages requiring consistent and heavy-duty operation.",
            imageSrc: "/images/c1.png",
            imageAlt: "Hydraulic Car Lift",
        },
        {
            type: "TYPE 02",
            titleGold: "Scissor",
            titleWhite: "Car Lift",
            description:
                "Space-saving lift solution perfect for modern workshops, offering stability and easy vehicle access.",
            imageSrc: "/images/c1.png",
            imageAlt: "Scissor Car Lift",
        },
        {
            type: "TYPE 03",
            titleGold: "Two Post",
            titleWhite: "Car Lift",
            description:
                "Designed for quick maintenance tasks with full access to the vehicle’s underside, ensuring efficiency in service areas.",
            imageSrc: "/images/c1.png",
            imageAlt: "Two Post Car Lift",
        },
    ],
    PASSENGER_ELEVATOR: [
        {
            type: "TYPE 01",
            titleGold: "Passenger",
            titleWhite: "Lift",
            description:
                "Designed For Smooth And Efficient Movement Of People In Commercial Buildings Like Offices, Malls, And Hotels. Ensures Comfort, Safety, And High Performance During Peak Hours.",
            imageSrc: "/images/p.jpeg",
            imageAlt: "Passenger Lift",
        },
        {
            type: "TYPE 02",
            titleGold: "Freight",
            titleWhite: "Elevator",
            description:
                "Built To Transport Heavy Goods And Industrial Cargo Across Multiple Floors. Robust Construction Ensures Durability, Load Stability, And Safe Operation In Demanding Environments.",
            imageSrc: "/images/h.jpeg",
            imageAlt: "Freight Elevator",
        },
        {
            type: "TYPE 03",
            titleGold: "Panoramic",
            titleWhite: "Lift",
            description:
                "Offers Stunning 360° Views Through Glass Enclosures, Perfect For Luxury Hotels, Malls, And High-End Residences. Combines Aesthetic Appeal With Smooth, Silent Operation.",
            imageSrc: "/images/p.jpeg",
            imageAlt: "Panoramic Lift",
        },
        {
            type: "TYPE 04",
            titleGold: "Home",
            titleWhite: "Elevator",
            description:
                "Compact And Elegant Solution For Residential Spaces. Designed To Fit Seamlessly Into Home Interiors While Providing Safe, Quiet, And Reliable Vertical Transportation.",
            imageSrc: "/images/h.jpeg",
            imageAlt: "Home Elevator",
        },
    ],
};

export const LIFE_HERO_SECTION = {
    HOME: {
        headlineDark: "Designed Spaces",
        headlineMuted: "for Refined Stays",
        tagline:
            "Your Life's Changing. Don't Just Find A Place — Find What's Next.",
        taglineMuted:
            "We Help You Move Forward With Clarity, Confidence, And The Right Agent By Your Side.",
        ctaBtn: "Get a free quote",
        imageSrc: "/images/life.png",
        imageAlt: "Designed Spaces for Refined Stays",
    },
    CAR: {
        headlineDark: "Designed Spaces",
        headlineMuted: "for Refined Stays",
        tagline:
            "Your Life's Changing. Don't Just Find A Place — Find What's Next.",
        taglineMuted:
            "We Help You Move Forward With Clarity, Confidence, And The Right Agent By Your Side.",
        ctaBtn: "Get a free quote",
        imageSrc: "/images/life-car .png",
        imageAlt: "Designed Spaces for Refined Stays",
    },
    PASSENGER_ELEVATOR: {
        headlineDark: "Designed Spaces",
        headlineMuted: "for Refined Stays",
        tagline:
            "Your Life's Changing. Don't Just Find A Place — Find What's Next.",
        taglineMuted:
            "We Help You Move Forward With Clarity, Confidence, And The Right Agent By Your Side.",
        ctaBtn: "Get a free quote",
        imageSrc: "/images/life.png",
        imageAlt: "Designed Spaces for Refined Stays",
    },
};

export const DESIGNED_SPACES_HERO = {
    HOME: {
        thumbnail: [
            { src: "/images/r1.jpg", alt: "Elevator view 1" },
            { src: "/images/r2.jpg", alt: "Elevator view 2" },
            { src: "/images/r3.jpg", alt: "Elevator view 3" },
            { src: "/images/r4.jpg", alt: "Elevator view 4" },
        ],
        images: [
            "/images/r1.jpg",
            "/images/r2.jpg",
            "/images/r3.jpg",
            "/images/r4.jpg",
        ],
        review_avatars: [
            "/images/t1.jpg",
            "/images/t2.jpg",
            "/images/t3.jpg",
            "/images/t4.jpg",
        ],
    },
    CAR: {
        thumbnail: [
            { src: "/images/car-r-1.png", alt: "Elevator view 1" },
            { src: "/images/car-r-2.png", alt: "Elevator view 2" },
            { src: "/images/car-r-3.png", alt: "Elevator view 3" },
            { src: "/images/car-r-4.png", alt: "Elevator view 4" },
        ],
        images: [
            "/images/car-r-1.png",
            "/images/car-r-2.png",
            "/images/car-r-3.png",
            "/images/car-r-4.png",
        ],
        review_avatars: [
            "/images/t1.jpg",
            "/images/t2.jpg",
            "/images/t3.jpg",
            "/images/t4.jpg",
        ],
    },
    PASSENGER_ELEVATOR: {
        thumbnail: [
            { src: "/images/t1.jpg", alt: "Elevator view 1" },
            { src: "/images/t2.jpg", alt: "Elevator view 2" },
            { src: "/images/t3.jpg", alt: "Elevator view 3" },
            { src: "/images/t4.jpg", alt: "Elevator view 4" },
        ],
        images: [
            "/images/t1.jpg",
            "/images/t2.jpg",
            "/images/t3.jpg",
            "/images/t4.jpg",
        ],
        review_avatars: [
            "/images/t1.jpg",
            "/images/t2.jpg",
            "/images/t3.jpg",
            "/images/t4.jpg",
        ],
    },
};
export const FAQ = {
    HOME: {
        fnq: [
            {
                id: "01",
                question: "What types of elevators does Invent Elevator offer?",
                answer: "We offer a wide range of elevator solutions including passenger lifts, home lifts, hospital elevators, goods lifts and custom-designed elevator systems tailored to project requirements.",
            },
            {
                id: "02",
                question: "Do you provide customized elevator solutions?",
                answer: "Yes, we specialize in bespoke elevator designs that match your building's architecture, load requirements, and aesthetic preferences. Our engineers work closely with you from concept to installation.",
            },
            {
                id: "03",
                question: "Are your elevators safe during power failure?",
                answer: "All our elevators are equipped with battery-powered rescue devices (ARD) that automatically lower the cabin to the nearest floor and open the doors safely in case of a power outage.",
            },
            {
                id: "04",
                question: "Do you offer installation and maintenance services?",
                answer: "Absolutely. We provide end-to-end services including site surveys, installation, commissioning, annual maintenance contracts (AMC), and 24/7 emergency support.",
            },
            {
                id: "05",
                question:
                    "What is the typical lead time for an elevator project?",
                answer: "Lead times vary by project complexity, but a standard passenger lift typically takes 8–12 weeks from order confirmation to installation completion.",
            },
        ],
    },
    CAR: {
        fnq: [
            {
                id: "01",
                question: "What types of elevators does Invent Elevator offer?",
                answer: "We offer a wide range of elevator solutions including passenger lifts, home lifts, hospital elevators, goods lifts and custom-designed elevator systems tailored to project requirements.",
            },
            {
                id: "02",
                question: "Do you provide customized elevator solutions?",
                answer: "Yes, we specialize in bespoke elevator designs that match your building's architecture, load requirements, and aesthetic preferences. Our engineers work closely with you from concept to installation.",
            },
            {
                id: "03",
                question: "Are your elevators safe during power failure?",
                answer: "All our elevators are equipped with battery-powered rescue devices (ARD) that automatically lower the cabin to the nearest floor and open the doors safely in case of a power outage.",
            },
            {
                id: "04",
                question: "Do you offer installation and maintenance services?",
                answer: "Absolutely. We provide end-to-end services including site surveys, installation, commissioning, annual maintenance contracts (AMC), and 24/7 emergency support.",
            },
            {
                id: "05",
                question:
                    "What is the typical lead time for an elevator project?",
                answer: "Lead times vary by project complexity, but a standard passenger lift typically takes 8–12 weeks from order confirmation to installation completion.",
            },
        ],
    },
    PASSENGER_ELEVATOR: {
        fnq: [
            {
                id: "01",
                question: "What types of elevators does Invent Elevator offer?",
                answer: "We offer a wide range of elevator solutions including passenger lifts, home lifts, hospital elevators, goods lifts and custom-designed elevator systems tailored to project requirements.",
            },
            {
                id: "02",
                question: "Do you provide customized elevator solutions?",
                answer: "Yes, we specialize in bespoke elevator designs that match your building's architecture, load requirements, and aesthetic preferences. Our engineers work closely with you from concept to installation.",
            },
            {
                id: "03",
                question: "Are your elevators safe during power failure?",
                answer: "All our elevators are equipped with battery-powered rescue devices (ARD) that automatically lower the cabin to the nearest floor and open the doors safely in case of a power outage.",
            },
            {
                id: "04",
                question: "Do you offer installation and maintenance services?",
                answer: "Absolutely. We provide end-to-end services including site surveys, installation, commissioning, annual maintenance contracts (AMC), and 24/7 emergency support.",
            },
            {
                id: "05",
                question:
                    "What is the typical lead time for an elevator project?",
                answer: "Lead times vary by project complexity, but a standard passenger lift typically takes 8–12 weeks from order confirmation to installation completion.",
            },
        ],
    },
};

const Brush = ({ selectedColor }) => (
    <svg
        width="29"
        height="133"
        viewBox="0 0 29 133"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transition: '.3s' }}
    // className={styles.brush_svg}
    >
        <path d="M0 44.8311H29V67.5632H0V44.8311Z" fill="white" />
        <path d="M0 44.8311H29V67.5632H0V44.8311Z" fill="url(#paint0_linear)" />
        <path
            d="M21 19.0002H8C7.44772 19.0002 7 18.5525 7 18.0002V8.60024C7 8.23093 7.20355 7.89168 7.52941 7.71789L20.5294 0.784556C21.1955 0.429299 22 0.911987 22 1.66691V18.0002C22 18.5525 21.5523 19.0002 21 19.0002Z"
            fill={selectedColor}
        />
        <g style={{ mixBlendMode: "multiply" }}>
            <path
                d="M22 1.66691V16H7V8.60024C7 8.23093 7.20355 7.89168 7.52941 7.71789L20.5294 0.784556C21.1955 0.429299 22 0.911987 22 1.66691Z"
                fill="url(#paint1_linear)"
            />
        </g>
        <path
            d="M0 33.8604V44C0 45.6569 1.34315 47 3 47H26C27.6569 47 29 45.6569 29 44V33.8604C29 33.2981 28.842 32.7472 28.544 32.2704L24.456 25.7296C24.158 25.2528 24 24.7019 24 24.1396V19C24 17.3431 22.6569 16 21 16H8C6.34315 16 5 17.3431 5 19V24.1396C5 24.7019 4.84199 25.2528 4.544 25.7296L0.456005 32.2704C0.158008 32.7472 0 33.2981 0 33.8604Z"
            fill="url(#paint2_angular)"
        />
        <path
            d="M0 33.7208V43.8604C0 45.5172 1.34315 46.8604 3 46.8604H26C27.6569 46.8604 29 45.5172 29 43.8604V33.7208C29 33.1585 28.842 32.6076 28.544 32.1308L24.456 25.59C24.158 25.1132 24 24.5623 24 24H5C5 24.5623 4.84199 25.1132 4.544 25.59L0.456005 32.1308C0.158008 32.6076 0 33.1585 0 33.7208Z"
            fill="url(#paint3_angular)"
        />
        <path
            d="M7 16.5C7 16.2239 7.22386 16 7.5 16H21.5C21.7761 16 22 16.2239 22 16.5V16.5C22 16.7761 21.7761 17 21.5 17H7.5C7.22386 17 7 16.7761 7 16.5V16.5Z"
            fill="#6D6D6D"
        />
        <path d="M0 34H29V133H0V34Z" fill="url(#paint4_linear)" />
        <defs>
            <linearGradient
                id="paint0_linear"
                x1="-1.09699e-08"
                y1="61.3836"
                x2="29"
                y2="61.3836"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#383839" />
                <stop offset="0.0786872" stopColor="#222426" />
                <stop offset="0.247962" stopColor="#26272A" />
                <stop offset="0.367865" stopColor="#303030" />
                <stop offset="0.638131" stopColor="#515151" />
                <stop offset="0.910954" stopColor="#313131" />
                <stop offset="0.962677" stopColor="#313131" />
                <stop offset="0.999795" stopColor="#393939" />
            </linearGradient>
            <linearGradient
                id="paint1_linear"
                x1="7"
                y1="9.5423"
                x2="22"
                y2="9.5423"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#EBEBEB" />
                <stop offset="0.5" stopColor="#F6F6F6" />
                <stop offset="0.682292" stopColor="#EFEFEF" />
                <stop offset="0.911458" stopColor="#DDDDDD" />
            </linearGradient>
            <radialGradient
                id="paint2_angular"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(14.5 2.92808) rotate(90) scale(38.6476 26.6718)"
            >
                <stop offset="0.0927515" stopColor="#303030" />
                <stop offset="0.482352" stopColor="#3F3F3F" />
                <stop offset="0.846832" stopColor="#272727" />
                <stop offset="0.904555" stopColor="#262626" />
                <stop offset="0.99975" stopColor="#505050" />
                <stop offset="0.99985" stopColor="#505050" />
            </radialGradient>
            <radialGradient
                id="paint3_angular"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(14.5 14.3603) rotate(90) scale(28.5 26.6718)"
            >
                <stop offset="0.0927515" stopColor="#303030" />
                <stop offset="0.482352" stopColor="#3F3F3F" />
                <stop offset="0.846832" stopColor="#272727" />
                <stop offset="0.904555" stopColor="#262626" />
                <stop offset="0.99975" stopColor="#505050" />
                <stop offset="0.99985" stopColor="#505050" />
            </radialGradient>
            <linearGradient
                id="paint4_linear"
                x1="29"
                y1="45.1236"
                x2="8.44105e-07"
                y2="45.1236"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#1F2022" />
                <stop offset="0.0658283" stopColor="#1F2022" />
                <stop offset="0.177219" stopColor="#303030" />
                <stop offset="0.500252" stopColor="#494949" />
                <stop offset="0.876195" stopColor="#272727" />
                <stop offset="0.892155" stopColor="#262626" />
                <stop offset="0.966382" stopColor="#383838" />
                <stop offset="0.999795" stopColor="#5F5F5F" />
            </linearGradient>
        </defs>
    </svg>
)

export default Brush;
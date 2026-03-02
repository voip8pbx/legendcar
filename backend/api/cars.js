/**
 * Vercel Serverless Function - Cars API
 * Handles GET requests for car data
 * 
 * This function is automatically exposed at:
 * /api/cars (in production on Vercel)
 * http://localhost:3000/api/cars (in development)
 */

const carsData = [
    {
        id: 1,
        year: "1969",
        model: "Dodge Charger",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBerFQ1fvO95sAlQjUoBoUpxKVe8XvHpuifdM7XH2Ip0xuIUMrtWJH6RA1-FWUy3iG2ObZlEgLPKr4EAFD9qtqdQo3fbiq1Q_Myj3SbLh-8vPX-HJ-dFK5iRt76MP-rpJLhdmPh1OoqJ4ltY-QbUKrv3duCxhmllEZPNU1L7D2jJf9d6hS731xXfloAB4cl81Pp_Ylutqd85w6t_-fv3MAgUTHYRQT-WPZAsT0kl740PXAytgIJGzBRKGcgPrKAuNGnWpFAWX0-xeE"
    },
    {
        id: 2,
        year: "1974",
        model: "Porsche 911 Carrera",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNOVMU4stKtSoWETUr50H2KpRmTzTfKgLjSbvSEn0tyOXgIGuiePje3vlpVSDTxg0weTxlhsg9EAVCxDvJgwtBE0IpI2biSxPU0dT_oqV9-YrwJBq5jW3V4IzVkhM7nesGbFcZ36S0lVUvmre-_Pu23rJ5X0hbHpdXTZ0DjVByDfbL3gzx-5HaEt3lu23dnwlo8OYTwvCj4ZjdQy7vp6yhzJVyHJ3z3cO_oX31AleYQ7QrbgAL4CFJHf99gtMucAgmEMsuxTWOT6Y"
    },
    {
        id: 3,
        year: "1961",
        model: "Jaguar E-Type",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA11T9zLAJzl4VjvBs5QPXNo4jyqYT-739ywMJLNb2BsUZBXmg6Bq-NelTdDSYxjGClhmjlxlXOtBwi9Avnfl9jkpaUhOGkJKXYWyNj9rK9G7Dl2867vW9qJO6TDHTfYmoPxNPg-d7ar1Hgxl18ldJCLikW3LGj7axzZ1FVZPeEvDsIvwg1SEFNhcpAP99t090migvswtraUkKmmmgnUGvmFqjXGjkIsXkjyu3CZYUo586l3dz6PQ6abq3scmbjlX2GZ88Ar3RBGk"
    },
    {
        id: 4,
        year: "1967",
        model: "Ford Mustang GT",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO9_w9Vf_k7DsODq_gsMgX-MqpsrVTlEhxsPsCYMttchQEabwAGwkQkELP0TtKQICugFjruWVXANWUN6jvMBXal3sr5TBoOC0BbI7RdnO9BXreUUPIGYK980wspWTWp-pGZbjRw6f0zDJ7jvC017KB3Z7imJ2HxyuuZVFaAhDUk78fCNEZsU_ZE9lB4Y8guHo9Z4Ju8ABgJ-3Nb3m4mA8V6gSNSxvBEkkUqlJoC-n1WxwiKabl475bbLElMkKIHOBFDcL4uatDkG0"
    },
    {
        id: 5,
        year: "1962",
        model: "Ferrari 250 GTO",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsotIZDzapzt2bW20rlm_dcOzi8avP1GPFmRlUIqGCER6Z5SwhnMPUZg5nsfqbbrCaA-9MHVXubaVbuVvCQYmdqfPLIu10dgm-YM1LTgOqsVBretmE0XaPTlbgwZcgwUDIJ8GMEMl1rqTaKPxS44oF-YxCoR0hUWjfnjkAYNd5ZfWAeFkX56DaOGk5YfGaHfenDsyANX0xVThSuez3iLNf1BN1oKcmTgJqpoXzd_zbWDCzN1QTNGxWwr0rmBeECHnUSsmgIhIeGjs"
    },
    {
        id: 6,
        year: "1963",
        model: "Corvette Sting Ray",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd9ujwnEJP3kg5wm7kiz7jUNKlHlVHULbd3a-GgDkKVCkDjYpLPUqh6a-oqjBfvzNNyYMYJbqfSftMoU6MP8Fw_leV0rAwRlCJpoOQY4s5C4_80ifSPWpO8NAu0pM9p35CBjQLBOw7tUnX88ZQ9x3ldVrGVGRUa8YM6qQok4pd4m9p6q8iYLYS4vJiBHkC4ER8nkaIPF7WDS3x1XnW2OQObxpwuVwgLJEzjI1pktnw0sipBSlddwRU6jjk_ah2I1aOb8UrZMtBNbU"
    }
];

/**
 * Handler function for Vercel Serverless Function
 * @param {Object} req - Node.js request object
 * @param {Object} res - Node.js response object
 */
module.exports = (req, res) => {
    // Enable CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Handle GET request
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            success: true,
            data: carsData,
            count: carsData.length
        });
        return;
    }
    
    // Method not allowed
    res.setHeader('Content-Type', 'application/json');
    res.status(405).json({
        success: false,
        error: 'Method not allowed. Only GET requests are supported.'
    });
};

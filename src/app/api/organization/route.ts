export async function GET(request: Request) {
    return Response.json([
        {
            name: 'MAUL',
            url: 'maul.ca',
            description: "Men's Avalon Ultimate League",
        },
    ])
}

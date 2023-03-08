import Link from "next/link";

export default function ProductPage({ product }) {    
    console.log(product)
    return (
        <div>
            <p>Page: {product.title}</p>

            <Link href={`/product`}> 
                <a>Back</a>
            </Link>
        </div>
    )
}


export async function getStaticProps ({ params }) {
    const { product } = params;

    const result = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`, 
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query GetProduct($slug: String!) {
                        productCollection (
                            where: {
                                slug: $slug
                            },
                            limit: 1
                        )   {
                            items {
                                title
                            }
                        }
                    }
                `,
                variables: {
                    slug: product,
                },
            })
        });

    if(!result.ok) {
        console.error(result);
        return {};        
    }

    const { data } = await result.json();
    const [productData] = data.productCollection.items;

    return {
        props: { product: productData },        
    }
}

export async function getStaticPaths() {
    const result = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`, 
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            query: `
                query {
                    productCollection {
                    items {
                        title
                        slug
                    }
                    }
                }
            `,
        })
    });

    if(!result.ok) {
        console.error(result);
        return {};        
    }

    const { data } = await result.json();
    const productSlug = data.productCollection.items;

    const paths = productSlug.map(({ slug }) => {
        return {
            params: { product: slug },
        };
    });

    return {
        paths,
        fallback: false,
    } 

}
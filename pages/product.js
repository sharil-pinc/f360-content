import Link from 'next/link';

export default function product ({ products }){
    console.log(products)
    return (
        <div>
            This is Product Page

            <ul>
                {products.map((product) => (
                    <li key={product.slug}>
                        <Link href={`/product/${product.slug}`}> 
                            <a>{product.title}</a>
                        </Link>
                    </li>
                ))}                
            </ul>
        </div>
    )
}

export async function getStaticProps () {

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
        console.log(result);
        return {};        
    }

    const {data} = await result.json();
    const products = data.productCollection.items;

    return {
        props: {
            products,
        }
    }    
}
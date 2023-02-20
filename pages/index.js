import { createClient } from 'contentful';
import ProductDetail from '../components/ProductDetail';

export async function getStaticProps() {
    
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID, 
        accessToken: process.env.CONTENTFUL_ACCESS_KEY, 
    });

    const res = await client.getEntries({ content_type: 'product' });

    return {
        props: {
            products: res.items
        }
    }

}

export default function Products({products}) {
  console.log(products)

  return (
    <div className="product-list">
      <h4>PRODUCT LIST</h4>
      {products.map(product => (        
        <ProductDetail key={ product.sys.id } product={product} />
      ))}

      <style jsx>{`
      .product-list {
        display: grid;
        grid-template-columns: 1ft 1fr;
        grid-gap: 20px 60px;
      }
      `}</style>
    </div>
    
  )
}
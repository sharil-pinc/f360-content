import { createClient } from "contentful";
import Link from "next/dist/client/link";
import Image from "next/image"

// const client = createClient({
//     space: process.env.CONTENTFUL_SPACE_ID, 
//     accessToken: process.env.CONTENTFUL_ACCESS_KEY, 
// });

export default function ProductDetails({ product }) {

    // const { title, price, slug, image } = product.fields

    return (
      <div>
        Product Details           

        {/* <div className="card">
            <div className="features">
                <Image
                    src={'https:' + image.fields.file.url}
                    width={image.fields.file.details.image.width}
                    height={image.fields.file.details.image.height}
                /> 
            </div>
            <div className="content">
                <div className="info">
                    <h4>{title}</h4>
                    <p>Price: RM{price}</p>
                </div>
            </div>
        </div> */}        

        <div className="action">
            <Link href={'../'} className=""><a>Back</a></Link>
        </div>

        <style jsx>{`
            .actions {
                margin-top: 20px;
                display: flex;
                justify-content: flex-end;
            }
            .actions a {
                color: #fff;
                background: #f01b29;
                padding: 16px 24px;
                text-decoration: none;
            }            
        `}</style>
        
      </div>      
    )
  }
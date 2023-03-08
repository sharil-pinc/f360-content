export default function faq ({ faqs }){
    
    return (
        <div>
            <strong>Frequenty Asked Questions</strong>
            
            {faqs.map((faq) => (
                <p key={faq.questions}>
                    {faq.questions} <br />                
                    {faq.answers}
                </p>
            ))}
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
                    faqsCollection {
                        items {
                            questions
                            answers
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

    const { data } = await result.json();
    const faqs = data.faqsCollection.items;

    return {
        props: {
            faqs,
        }
    }    
}
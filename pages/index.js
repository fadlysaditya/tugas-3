import { useQuery, gql  } from "@apollo/client";
import { withApollo } from "../lib/apollo";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const CATEGORY_LIST = gql`

  query Category {
    categoryList(filters: {}){
      id
      name
      image_path
    }
  }

`;

function Home() {
  const { loading, error, data } = useQuery(CATEGORY_LIST, {
  });

  if (loading) {
    return <div>loading...</div>;
  }
  const category = data.categoryList;
  return (
    <div>
      <div className="container-fluid">
        <h1>List Category</h1>

          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="row text-center">
              {
                category.map((val, idx) => {
                  var id = val.id;
                  var name = val.name;
                  var img_path = val.image_path
                  if(img_path == "" || img_path == null){
                    img_path = "https://dummyimage.com/80x80/2c9e7e/f50000.png&text=Items+Dummy"
                  }
                  return (
                    <Link key={idx} href="/category_detail/[index]" as={`/category_detail/${id}`}>
                      <a className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h3 className="product_name">{name}</h3>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <img src={img_path} className="img_small2 margin-top-10"/>
                          </div>
                        </div>
                      </a>
                    </Link>
                  );
                })
              } 

            </div>
          </div>

      </div>
    </div>
  );
}

export default  withApollo({ ssr: true }) (Home);
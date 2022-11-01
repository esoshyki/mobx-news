import { Article as ArticleType } from "../store/newsApi";

export default function Article (props: ArticleType) {

  return (
    <div className="card full-width container-flex-col gap15">
      <img src={props.urlToImage} className="full-width" />
      <div className="full-width container-flex-col padding10" >
      <a href={props.url} target="_blank">
        {props.title}
      </a>
      </div>
    </div>
  )

}
import { Link } from "react-router-dom";

const BlankPage = () => {
    return (
      <div>
        空っぽのページです。テスト用。
        <p><Link to="/">戻る</Link></p>
      </div>
    );
  }
  export default BlankPage;
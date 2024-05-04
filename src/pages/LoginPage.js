import { Authenticator } from '@aws-amplify/ui-react';
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
    <Authenticator>
       {({ signOut, user }) => (
       <main>
        <h1>Mobirta<br /></h1>
        <h2>ユーザーネーム："{user.username}"さん、こんにちは！<br /></h2>
          
        <p><Link to="/blank">ブランクページへ移動</Link></p>
        <p><Link to="/upload">ファイルアップロード</Link></p><br /><br /><br />

        <button onClick={signOut}>サインアウト</button><br />
        </main>
        )}
      </Authenticator>
      );
}

export default LoginPage;
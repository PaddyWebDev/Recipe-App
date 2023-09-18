import { Html, Head, Main, NextScript } from "next/document";
const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="shortcut icon"
          href="/recipe-app-logo.png"
          type="image/x-icon"
        />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css" rel="stylesheet" />
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document

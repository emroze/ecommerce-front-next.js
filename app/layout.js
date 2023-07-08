import { CustomFont } from "@/components/fonts/CustomFont";
import { CartContextProviders } from "@/components/CartContext";
import { GlobalStyle } from "@/components/GlobalStyle";
import StyledComponentsRegistry from "@/lib/registry";
import Providers from "@/components/providers";



export const metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce Front',
}

export default function RootLayout({ children }) {
  return (
    // <html lang="en" className={CustomFont.className}>
    <html lang="en" className={CustomFont.className}> 
      <body >
        <Providers>
          <GlobalStyle/>
          <CartContextProviders>
            <StyledComponentsRegistry>
            {children}
            </StyledComponentsRegistry>
          </CartContextProviders>
        </Providers>
          
      </body>
    </html>
  )
}


import { CustomFont } from "@/components/fonts/CustomFont";
import { CartContextProviders } from "@/components/CartContext";
import { GlobalStyle } from "@/components/GlobalStyle";
import StyledComponentsRegistry from "@/lib/registry";



export const metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce Front',
}

export default function RootLayout({ children }) {
  return (
    // <html lang="en" className={CustomFont.className}>
    <html lang="en">
      <body className={CustomFont.className}>
        <GlobalStyle/>
          <CartContextProviders>
          
            <StyledComponentsRegistry>
            {children}
            </StyledComponentsRegistry>
            
          </CartContextProviders>
      </body>
    </html>
  )
}


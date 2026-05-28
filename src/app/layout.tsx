import Link from "next/link";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning>
            <body>
                <div className="nav">
                    <Link className="tab-link" href="/">
                        Home
                    </Link>
                    <Link className="tab-link" href="/People">
                        People
                    </Link>
                    <Link className="tab-link" href="/Transactions">
                        Transactions
                    </Link>
                </div>
                {children}
            </body>
        </html>
    );
}

import Header from "@/components/Header";
import Logo from "@/components/Logo";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="p-4">
                <Logo />
            </header>
            {children}
        </>
    );
}
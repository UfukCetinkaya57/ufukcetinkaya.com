import { footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>{footer.text}</p>
      </div>
    </footer>
  );
}

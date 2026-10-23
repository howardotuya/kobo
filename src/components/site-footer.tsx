import { footer } from "@/content/landing";
import { MaybeLink, underline } from "./ui";

export function SiteFooter() {
  return (
    <footer className="container-page mt-[50px] pb-[34px] lg:mt-20 lg:pb-[43px]">
      <div className="grid gap-[30px] border-line lg:grid-cols-[1fr_auto] lg:border-t lg:pt-10">
        <div>
          <p className="text-xl leading-[1.3] font-semibold tracking-[-0.02em] lg:text-[22px]">
            Kòbò
          </p>
          <p className="mt-1.5 text-sm leading-[1.3] text-soft lg:mt-[7px] lg:text-[15px]">
            {footer.tagline}
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-y-7 lg:grid-cols-[200px_200px_160px]"
        >
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm leading-[1.3] font-medium lg:text-[15px]">{column.title}</h2>
              <ul className="mt-2.5 grid gap-2.5 text-sm leading-[1.3] text-soft lg:mt-[17px] lg:gap-[11px] lg:text-[15px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <MaybeLink
                      href={link.href}
                      className={link.href ? `${underline} hover:text-ink` : undefined}
                    >
                      {link.label}
                    </MaybeLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <p className="mt-[38px] text-xs leading-[1.3] text-soft lg:mt-[15px] lg:text-[13px]">
        {footer.legal}
      </p>
    </footer>
  );
}

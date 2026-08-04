import Link from "next/link";
import { SERVICES, serviceInquiryHref } from "@/lib/services";

export function ServiceCardGrid({ limit }: { limit?: number }) {
  const list = typeof limit === "number" ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <div className="service-list">
      {list.map((service, index) => (
        <article key={service.slug} className="service-row">
          <span className="idx">{String(index + 1).padStart(2, "0")}</span>
          <div className="body">
            <span className="cat">{service.category}</span>
            <h3>
              <Link href={`/service/${service.slug}`}>{service.title}</Link>
            </h3>
            <p>{service.shortDesc}</p>
            <p className="meta">Turnaround · {service.turnaround}</p>
          </div>
          <div className="card-actions">
            <Link href={`/service/${service.slug}`} className="btn btn-outline">
              Details
            </Link>
            <Link href={serviceInquiryHref(service.slug)} className="btn btn-primary">
              Inquire
              <span className="btn-ico" aria-hidden>
                ↗
              </span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

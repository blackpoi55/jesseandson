import { PageHero } from "@/components/page-hero";

export function LegalPage({ title, effective, html }: { title: string; effective: string; html: string }) {
  return (
    <>
      <PageHero
        image="/media/37ee7-8-inexterior.webp"
        eyebrow="Legal"
        title={title}
        lead={effective}
        crumbs={[{ label: title }]}
        size="md"
      />
      <section className="py-20 md:py-28">
        <div className="container-narrow">
          <div className="prose-article" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </>
  );
}

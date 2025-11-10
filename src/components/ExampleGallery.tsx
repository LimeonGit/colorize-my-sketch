import { Card } from "@/components/ui/card";

const examples = [
  {
    sketch: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80&auto=format&fit=crop",
    colored: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80&auto=format&fit=crop",
    title: "Portrait Sketch",
  },
  {
    sketch: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80&auto=format&fit=crop",
    colored: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&q=80&auto=format&fit=crop",
    title: "Nature Scene",
  },
  {
    sketch: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80&auto=format&fit=crop",
    colored: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80&auto=format&fit=crop",
    title: "Abstract Art",
  },
];

export const ExampleGallery = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See the Magic in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore examples of sketches transformed into vibrant, colorful artwork
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <Card
              key={index}
              className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={example.sketch}
                    alt={`${example.title} sketch`}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={example.colored}
                    alt={`${example.title} colored`}
                    className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold">Hover to see color</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{example.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

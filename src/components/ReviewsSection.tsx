import { useState, useEffect } from "react";
import { Star, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const StarRating = ({
  rating,
  onRate,
  interactive = false,
  size = 20,
}: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
  size?: number;
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`transition-colors ${
            interactive ? "cursor-pointer" : ""
          } ${
            star <= (hover || rating)
              ? "fill-primary text-primary"
              : "text-muted-foreground/40"
          }`}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate?.(star)}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  const formattedDate = new Date(review.created_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3 hover:border-primary/30 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground font-[family-name:var(--font-display)] text-sm uppercase tracking-wide">
              {review.name}
            </p>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size={14} />
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data as Review[]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName || trimmedName.length > 50) {
      toast({ title: "Nome inválido", description: "Informe um nome com até 50 caracteres.", variant: "destructive" });
      return;
    }
    if (rating === 0) {
      toast({ title: "Selecione uma nota", description: "Clique nas estrelas para avaliar.", variant: "destructive" });
      return;
    }
    if (!trimmedComment || trimmedComment.length > 500) {
      toast({ title: "Comentário inválido", description: "Escreva um comentário com até 500 caracteres.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("reviews").insert({
      name: trimmedName,
      rating,
      comment: trimmedComment,
    });

    if (error) {
      toast({ title: "Erro ao enviar", description: "Tente novamente mais tarde.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    setName("");
    setRating(0);
    setComment("");
    setIsSubmitting(false);
    toast({ title: "Avaliação enviada!", description: "Obrigado pelo seu feedback." });
    fetchReviews();
  };

  return (
    <section id="avaliacoes" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-4">
            Avaliações dos{" "}
            <span className="text-gradient-gold">Clientes</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6" />
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-3">
              <StarRating rating={Math.round(averageRating)} size={22} />
              <span className="text-primary font-bold text-lg">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground text-sm">
                ({reviews.length}{" "}
                {reviews.length === 1 ? "avaliação" : "avaliações"})
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 h-fit">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold uppercase tracking-wide mb-6 text-foreground">
              Deixe sua avaliação
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Seu nome
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  maxLength={50}
                  className="bg-secondary border-border focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Sua nota
                </label>
                <StarRating rating={rating} onRate={setRating} interactive size={28} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Seu comentário
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Conte como foi sua experiência..."
                  maxLength={500}
                  rows={4}
                  className="bg-secondary border-border focus:border-primary resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {comment.length}/500
                </p>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-gold hover:opacity-90 text-primary-foreground font-semibold uppercase tracking-wider gap-2"
              >
                <Send size={16} />
                {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
              </Button>
            </form>
          </div>

          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Star size={48} className="text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-lg">
                  Nenhuma avaliação ainda.
                </p>
                <p className="text-muted-foreground/60 text-sm">
                  Seja o primeiro a avaliar!
                </p>
              </div>
            ) : (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

import { Star } from "lucide-react";
// import Image from "next/image";
import { User } from "@/payload-types";

interface Review {
  id?: string | null;
  user?: string | User | null;
  rating: number;
  reviewDate?: string | null; // Changed from date
  comment?: string | null;
}

interface ReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function Reviews({
  reviews,
  averageRating,
  totalReviews,
}: ReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="flex items-center mt-2 sm:mt-0">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? "fill-ochre text-ochre"
                    : "fill-none text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map(review => (
          <div
            key={review.id ?? `${review.user}-${review.reviewDate}`}
            className="border-b pb-6"
          >
            <div className="flex items-start">
              <div className="mr-4">
                {/* <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={"/placeholder.svg?height=40&width=40"}
                    alt={typeof review.user === "string" ? review.user : "User"}
                    fill
                    className="object-cover"
                  />
                </div> */}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    {typeof review.user === "string"
                      ? review.user
                      : ((review.user as User).username ?? "Anonymous")}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {review.reviewDate ?? "Unknown date"}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-ochre text-ochre"
                          : "fill-none text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-muted-foreground">
                  {review.comment ?? "No comment provided."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

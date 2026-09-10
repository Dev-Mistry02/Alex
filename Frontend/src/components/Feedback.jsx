import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

const Feedback = () => {
    const sectionRef = useRef(null);
    const reviewsScrollRef = useRef(null);
    const loadingScrollRef = useRef(null);

    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchStartScrollLeft = useRef(0);
    const isHorizontalSwipe = useRef(false);

    const INDIGO = "#4F46E5";
    const AMBER = "#F59E0B";

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        const elements =
            sectionRef.current?.querySelectorAll(
                ".reveal-up, .reveal-left, .reveal-right"
            );

        elements?.forEach((el) =>
            observer.observe(el)
        );

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        let mounted = true;

        const loadFeedback = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/feedback`
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load feedback"
                    );
                }

                const data =
                    await response.json();

                if (mounted) {
                    setFeedback(
                        Array.isArray(data)
                            ? data
                            : []
                    );
                }
            } catch (err) {
                console.error(
                    "Failed to load feedback:",
                    err
                );

                if (mounted) {
                    setError(
                        "Unable to load feedback right now."
                    );

                    setFeedback([]);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadFeedback();

        return () => {
            mounted = false;
        };
    }, []);


    useEffect(() => {
        const socket = io(API_URL, {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
        });


        socket.on("connect", () => {
            console.log(
                "Feedback realtime connected:",
                socket.id
            );
        });

        socket.on(
            "disconnect",
            (reason) => {
                console.log(
                    "Feedback realtime disconnected:",
                    reason
                );
            }
        );

        socket.on(
            "connect_error",
            (err) => {
                console.error(
                    "Feedback realtime connection error:",
                    err.message
                );
            }
        );


        const handleCreated = (
            newReview
        ) => {
            if (!newReview?.id) {
                return;
            }

            if (
                newReview.approved === false
            ) {
                return;
            }

            setFeedback((current) => {
                const exists =
                    current.some(
                        (item) =>
                            String(item.id) ===
                            String(
                                newReview.id
                            )
                    );

                if (exists) {
                    return current;
                }

                return [
                    newReview,
                    ...current,
                ];
            });
        };



        const handleUpdated = (
            updatedReview
        ) => {
            if (!updatedReview?.id) {
                return;
            }

            setFeedback((current) => {
                const updatedId = String(
                    updatedReview.id
                );


                if (
                    updatedReview.approved ===
                    false
                ) {
                    return current.filter(
                        (item) =>
                            String(
                                item.id
                            ) !== updatedId
                    );
                }



                const exists =
                    current.some(
                        (item) =>
                            String(
                                item.id
                            ) === updatedId
                    );


                if (exists) {
                    return current.map(
                        (item) =>
                            String(
                                item.id
                            ) === updatedId
                                ? updatedReview
                                : item
                    );
                }


                return [
                    updatedReview,
                    ...current,
                ];
            });
        };

        const handleDeleted = (
            deletedReview
        ) => {
            const deletedId =
                deletedReview?.id;

            if (!deletedId) {
                return;
            }

            console.log(
                "Removing deleted feedback:",
                deletedId
            );

            setFeedback((current) =>
                current.filter(
                    (item) =>
                        String(item.id) !==
                        String(deletedId)
                )
            );
        };


        socket.on(
            "feedback:created",
            handleCreated
        );

        socket.on(
            "feedback:updated",
            handleUpdated
        );

        socket.on(
            "feedback:deleted",
            handleDeleted
        );

        return () => {
            socket.off(
                "feedback:created",
                handleCreated
            );

            socket.off(
                "feedback:updated",
                handleUpdated
            );

            socket.off(
                "feedback:deleted",
                handleDeleted
            );

            socket.disconnect();
        };
    }, []);


    const averageRating = useMemo(() => {
        if (!feedback.length) {
            return 0;
        }

        const total =
            feedback.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.rating || 0
                    ),
                0
            );

        return total / feedback.length;
    }, [feedback]);

    const formattedAverage =
        averageRating
            ? averageRating.toFixed(1)
            : "0.0";

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSubmitted(false);

        const cleanName =
            name.trim();

        const cleanMessage =
            message.trim();

        if (cleanName.length < 2) {
            setError(
                "Please enter your name."
            );
            return;
        }

        if (cleanName.length > 80) {
            setError(
                "Name must be under 80 characters."
            );
            return;
        }

        if (
            rating < 1 ||
            rating > 5
        ) {
            setError(
                "Please select a rating."
            );
            return;
        }

        if (
            cleanMessage.length < 5
        ) {
            setError(
                "Please write a little more about your experience."
            );
            return;
        }

        if (
            cleanMessage.length > 150
        ) {
            setError(
                "Feedback must be under 150 characters."
            );
            return;
        }

        try {
            setSubmitting(true);

            const response =
                await fetch(
                    `${API_URL}/api/feedback`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            name: cleanName,
                            rating: Number(
                                rating
                            ),
                            message:
                                cleanMessage,
                        }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Something went wrong."
                );
            }


            setName("");
            setMessage("");
            setRating(0);
            setHoverRating(0);
            setSubmitted(true);
        } catch (err) {
            console.error(
                "Feedback submission failed:",
                err
            );

            setError(
                err.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };


    const Star = ({
        filled,
        onClick,
        onMouseEnter,
        onMouseLeave,
    }) => (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2"
            style={{
                color: filled
                    ? AMBER
                    : "#D1D5DB",

                backgroundColor: filled
                    ? `${AMBER}10`
                    : "transparent",
            }}
            aria-label={`${filled
                    ? "Selected"
                    : "Select"
                } star`}
        >
            <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill={
                    filled
                        ? "currentColor"
                        : "none"
                }
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        </button>
    );


    const handleTouchStart = (
        e,
        ref
    ) => {
        const touch =
            e.touches[0];

        touchStartX.current =
            touch.clientX;

        touchStartY.current =
            touch.clientY;

        touchStartScrollLeft.current =
            ref.current?.scrollLeft ||
            0;

        isHorizontalSwipe.current =
            false;
    };

    const handleTouchMove = (
        e,
        ref
    ) => {
        if (!ref.current) {
            return;
        }

        const touch =
            e.touches[0];

        const dx =
            touch.clientX -
            touchStartX.current;

        const dy =
            touch.clientY -
            touchStartY.current;

        if (
            !isHorizontalSwipe.current
        ) {
            if (
                Math.abs(dx) < 8 ||
                Math.abs(dx) <=
                Math.abs(dy)
            ) {
                return;
            }

            isHorizontalSwipe.current =
                true;
        }

        e.preventDefault();

        ref.current.scrollLeft =
            touchStartScrollLeft.current -
            dx;
    };

    const handleTouchEnd = () => {
        isHorizontalSwipe.current =
            false;
    };


    const scrollReviews = (
        direction
    ) => {
        const container =
            reviewsScrollRef.current;

        if (!container) {
            return;
        }

        const card =
            container.querySelector(
                "[data-review-card]"
            );

        const amount = card
            ? card.getBoundingClientRect()
                .width + 20
            : container.clientWidth *
            0.85;

        container.scrollBy({
            left:
                direction === "next"
                    ? amount
                    : -amount,

            behavior: "smooth",
        });
    };


    return (
        <section
            ref={sectionRef}
            id="feedback"
            className="feedback-section relative py-20 sm:py-28 lg:py-32 overflow-hidden"
        >

            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <div className="absolute inset-0 bg-white" />

                <div
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
                    style={{
                        background: `radial-gradient(
                            circle,
                            ${INDIGO}25 0%,
                            transparent 70%
                        )`,
                    }}
                />

                <div
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
                    style={{
                        background: `radial-gradient(
                            circle,
                            ${AMBER}22 0%,
                            transparent 70%
                        )`,
                    }}
                />
            </div>

            <div className="section-container relative z-10">


                <div className="max-w-3xl mx-auto text-center mb-14">

                    <div className="reveal-up">

                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-black/[0.06] text-sm font-medium text-text-secondary mb-6">

                            <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                    background:
                                        `linear-gradient(
                                            135deg,
                                            ${INDIGO},
                                            ${AMBER}
                                        )`,
                                }}
                            />

                            CUSTOMER FEEDBACK

                        </span>

                    </div>

                    <h2 className="section-heading text-gradient reveal-up">
                        WHAT OUR CLIENTS SAY.
                    </h2>

                    <p className="section-subheading mx-auto mt-5 reveal-up">
                        Your feedback helps us create
                        better designs, better prints,
                        and better experiences.
                    </p>

                </div>

                <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 max-w-6xl mx-auto">


                    <div className="reveal-left">

                        <div className="h-full rounded-3xl bg-white/80 backdrop-blur-xl border border-black/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-7 sm:p-9">

                            <div className="text-center">

                                <p className="font-body text-sm text-text-muted mb-3">
                                    Overall Rating
                                </p>

                                <div className="font-heading text-6xl sm:text-7xl font-bold text-[#111111]">
                                    {formattedAverage}
                                </div>

                                <div className="flex justify-center gap-1 mt-3">

                                    {[1, 2, 3, 4, 5].map(
                                        (star) => (
                                            <svg
                                                key={star}
                                                width="23"
                                                height="23"
                                                viewBox="0 0 24 24"
                                                fill={
                                                    star <=
                                                        Math.round(
                                                            averageRating
                                                        )
                                                        ? AMBER
                                                        : "none"
                                                }
                                                stroke={
                                                    AMBER
                                                }
                                                strokeWidth="1.5"
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                            </svg>
                                        )
                                    )}

                                </div>

                                <p className="font-body text-sm text-text-muted mt-3">
                                    Based on{" "}
                                    {feedback.length}{" "}
                                    {feedback.length ===
                                        1
                                        ? "review"
                                        : "reviews"}
                                </p>

                            </div>

                            <div className="my-8 h-px bg-black/[0.06]" />


                            <div className="space-y-3">

                                {[5, 4, 3, 2, 1].map(
                                    (star) => {
                                        const count =
                                            feedback.filter(
                                                (item) =>
                                                    Number(
                                                        item.rating
                                                    ) ===
                                                    star
                                            ).length;

                                        const percentage =
                                            feedback.length
                                                ? (count /
                                                    feedback.length) *
                                                100
                                                : 0;

                                        return (
                                            <div
                                                key={
                                                    star
                                                }
                                                className="flex items-center gap-3"
                                            >

                                                <span className="font-body text-xs text-text-muted w-5">
                                                    {star}
                                                </span>

                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill={
                                                        AMBER
                                                    }
                                                    stroke={
                                                        AMBER
                                                    }
                                                    strokeWidth="1"
                                                >
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>

                                                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">

                                                    <div
                                                        className="h-full rounded-full transition-all duration-700"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            background:
                                                                `linear-gradient(
                                                                    90deg,
                                                                    ${INDIGO},
                                                                    ${AMBER}
                                                                )`,
                                                        }}
                                                    />

                                                </div>

                                                <span className="font-body text-xs text-text-muted w-5 text-right">
                                                    {count}
                                                </span>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                            <div
                                className="mt-8 p-4 rounded-2xl text-center"
                                style={{
                                    background:
                                        `linear-gradient(
                                            135deg,
                                            ${INDIGO}08,
                                            ${AMBER}08
                                        )`,
                                    border:
                                        `1px solid ${INDIGO}12`,
                                }}
                            >
                                <p className="font-heading text-sm font-semibold text-[#111111]">
                                    Happy with our work?
                                </p>

                                <p className="font-body text-xs text-text-muted mt-1">
                                    Leave a review and
                                    help others
                                    discover ALEX.
                                </p>
                            </div>

                        </div>

                    </div>



                    <div className="reveal-right">

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="rounded-3xl bg-white/90 backdrop-blur-xl border border-black/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-7 sm:p-9"
                        >

                            <div className="mb-7">

                                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111]">
                                    Share your
                                    experience
                                </h3>

                                <p className="font-body text-sm text-text-muted mt-2">
                                    We'd love to know
                                    what you think
                                    about our work.
                                </p>

                            </div>


                            <div className="mb-5">

                                <label
                                    htmlFor="feedback-name"
                                    className="block font-heading text-sm font-semibold text-[#111111] mb-2"
                                >
                                    Your Name
                                </label>

                                <input
                                    id="feedback-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                    maxLength={80}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-black/[0.07] text-[#111111] placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white"
                                />

                            </div>


                            <div className="mb-6">

                                <label className="block font-heading text-sm font-semibold text-[#111111] mb-2">
                                    Your Rating
                                </label>

                                <div className="flex items-center gap-1">

                                    {[1, 2, 3, 4, 5].map(
                                        (star) => (
                                            <Star
                                                key={star}
                                                filled={
                                                    star <=
                                                    (hoverRating ||
                                                        rating)
                                                }
                                                onClick={() =>
                                                    setRating(
                                                        star
                                                    )
                                                }
                                                onMouseEnter={() =>
                                                    setHoverRating(
                                                        star
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setHoverRating(
                                                        0
                                                    )
                                                }
                                            />
                                        )
                                    )}

                                    <span className="font-body text-sm text-text-muted ml-3">
                                        {rating
                                            ? `${rating}/5`
                                            : "Select a rating"}
                                    </span>

                                </div>

                            </div>


                            <div className="mb-6">

                                <label
                                    htmlFor="feedback-message"
                                    className="block font-heading text-sm font-semibold text-[#111111] mb-2"
                                >
                                    Your Feedback
                                </label>

                                <textarea
                                    id="feedback-message"
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }
                                    maxLength={150}
                                    rows={5}
                                    placeholder="Tell us about your experience..."
                                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-black/[0.07] text-[#111111] placeholder:text-gray-400 outline-none resize-none transition-all duration-200 focus:bg-white"
                                />

                                <div className="text-right mt-1">

                                    <span className="font-body text-xs text-text-muted">
                                        {message.length}/150
                                    </span>

                                </div>

                            </div>


                            {error && (
                                <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-body">
                                    {error}
                                </div>
                            )}


                            {submitted && (
                                <div
                                    className="mb-5 px-4 py-3 rounded-xl text-sm font-body"
                                    style={{
                                        color: INDIGO,
                                        backgroundColor:
                                            `${INDIGO}08`,
                                        border:
                                            `1px solid ${INDIGO}15`,
                                    }}
                                >
                                    ⭐ Thank you! Your
                                    feedback has been
                                    submitted.
                                </div>
                            )}


                            <button
                                type="submit"
                                disabled={submitting}
                                className="feedback-submit w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#111111] text-white font-heading font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
                            >

                                {submitting ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                        SUBMITTING...
                                    </>
                                ) : (
                                    <>
                                        SUBMIT FEEDBACK

                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="m13 6 6 6-6 6" />
                                        </svg>
                                    </>
                                )}

                            </button>

                        </form>

                    </div>

                </div>


                <div className="max-w-6xl mx-auto mt-12">

                    <div className="flex items-center justify-between gap-4 mb-6 reveal-up">

                        <div>

                            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111111]">
                                Recent Feedback
                            </h3>

                            <p className="font-body text-sm text-text-muted mt-1">
                                Live customer reviews
                            </p>

                        </div>

                        <div className="flex items-center gap-2">

                            <button
                                type="button"
                                onClick={() =>
                                    scrollReviews(
                                        "prev"
                                    )
                                }
                                aria-label="Previous review"
                                className="feedback-nav-button w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/[0.08] bg-white flex items-center justify-center text-[#111111] shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:shadow-md active:scale-95"
                            >

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>

                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    scrollReviews(
                                        "next"
                                    )
                                }
                                aria-label="Next review"
                                className="feedback-nav-button w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-sm transition-all duration-200 hover:translate-x-0.5 hover:shadow-md active:scale-95"
                            >

                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>

                            </button>

                        </div>

                    </div>


                    {loading ? (

                        <div
                            ref={loadingScrollRef}
                            onTouchStart={(e) =>
                                handleTouchStart(
                                    e,
                                    loadingScrollRef
                                )
                            }
                            onTouchMove={(e) =>
                                handleTouchMove(
                                    e,
                                    loadingScrollRef
                                )
                            }
                            onTouchEnd={
                                handleTouchEnd
                            }
                            onTouchCancel={
                                handleTouchEnd
                            }
                            className="
                                flex
                                flex-nowrap
                                gap-4 sm:gap-5
                                overflow-x-auto
                                overflow-y-hidden
                                pb-4
                                snap-x snap-mandatory
                                scroll-smooth
                                scrollbar-hide
                                overscroll-x-contain
                                touch-pan-x
                                mobile-review-scroll
                                select-none
                            "
                            style={{
                                WebkitOverflowScrolling:
                                    "touch",
                                touchAction: "pan-y",
                            }}
                        >

                            {[1, 2, 3].map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="
                                            flex-none
                                            w-[85vw]
                                            sm:w-[420px]
                                            lg:w-[380px]
                                            h-48
                                            rounded-3xl
                                            bg-gray-50
                                            animate-pulse
                                            snap-start
                                        "
                                    />
                                )
                            )}

                        </div>

                    ) : feedback.length ===
                        0 ? (

                        <div className="text-center py-12 rounded-3xl bg-white/70 border border-black/[0.06]">

                            <div className="text-3xl mb-3">
                                ⭐
                            </div>

                            <p className="font-heading font-semibold text-[#111111]">
                                Be the first to
                                leave a review!
                            </p>

                            <p className="font-body text-sm text-text-muted mt-1">
                                Your feedback will
                                appear here.
                            </p>

                        </div>

                    ) : (

                        <div
                            ref={reviewsScrollRef}
                            onTouchStart={(e) =>
                                handleTouchStart(
                                    e,
                                    reviewsScrollRef
                                )
                            }
                            onTouchMove={(e) =>
                                handleTouchMove(
                                    e,
                                    reviewsScrollRef
                                )
                            }
                            onTouchEnd={
                                handleTouchEnd
                            }
                            onTouchCancel={
                                handleTouchEnd
                            }
                            className="
                                flex
                                flex-nowrap
                                gap-4 sm:gap-5
                                overflow-x-auto
                                overflow-y-hidden
                                pb-4
                                snap-x snap-mandatory
                                scroll-smooth
                                scrollbar-hide
                                overscroll-x-contain
                                touch-pan-x
                                mobile-review-scroll
                                select-none
                            "
                            style={{
                                WebkitOverflowScrolling:
                                    "touch",
                                touchAction: "pan-y",
                            }}
                        >

                            {feedback.map(
                                (item) => (
                                    <div
                                        key={
                                            item.id
                                        }
                                        data-review-card
                                        className="
                                            flex-none
                                            w-[85vw]
                                            sm:w-[420px]
                                            lg:w-[380px]
                                            snap-start
                                            group
                                            rounded-3xl
                                            bg-white/80
                                            backdrop-blur-xl
                                            border border-black/[0.06]
                                            p-5 sm:p-6
                                            min-w-0
                                            overflow-hidden
                                            hover:-translate-y-1
                                            hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)]
                                            transition-all
                                            duration-300
                                        "
                                    >


                                        <div className="flex gap-1 mb-4">

                                            {[1, 2, 3, 4, 5].map(
                                                (star) => (
                                                    <svg
                                                        key={star}
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill={
                                                            star <=
                                                                Number(
                                                                    item.rating
                                                                )
                                                                ? AMBER
                                                                : "none"
                                                        }
                                                        stroke={
                                                            AMBER
                                                        }
                                                        strokeWidth="1.5"
                                                    >
                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                    </svg>
                                                )
                                            )}

                                        </div>


                                        <p
                                            className="
                                                font-body
                                                text-sm
                                                text-text-secondary
                                                leading-relaxed
                                                min-h-[70px]
                                                w-full
                                                break-words
                                                whitespace-normal
                                                overflow-wrap-anywhere
                                            "
                                        >
                                            “{item.message}”
                                        </p>


                                        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-black/[0.06] min-w-0">

                                            <div
                                                className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-white font-heading text-sm font-bold"
                                                style={{
                                                    background:
                                                        `linear-gradient(
                                                            135deg,
                                                            ${INDIGO},
                                                            ${AMBER}
                                                        )`,
                                                }}
                                            >
                                                {item.name
                                                    ?.charAt(
                                                        0
                                                    )
                                                    .toUpperCase()}
                                            </div>

                                            <div className="min-w-0">

                                                <p className="font-heading text-sm font-semibold text-[#111111] break-words overflow-wrap-anywhere">
                                                    {
                                                        item.name
                                                    }
                                                </p>

                                                <p className="font-body text-xs text-text-muted">
                                                    Verified
                                                    feedback
                                                </p>

                                            </div>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>

                    )}

                </div>

            </div>



            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                .mobile-review-scroll {
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior-x: contain;
                }

                .reveal-up {
                    opacity: 0;
                    transform: translateY(25px);
                    transition:
                        opacity 700ms ease-out,
                        transform 700ms ease-out;
                }

                .reveal-left {
                    opacity: 0;
                    transform: translateX(-30px);
                    transition:
                        opacity 700ms ease-out,
                        transform 700ms ease-out;
                }

                .reveal-right {
                    opacity: 0;
                    transform: translateX(30px);
                    transition:
                        opacity 700ms ease-out,
                        transform 700ms ease-out;
                }

                .reveal-up.visible,
                .reveal-left.visible,
                .reveal-right.visible {
                    opacity: 1;
                    transform: translate(0);
                }

                @media (max-width: 1024px) {
                    .reveal-left,
                    .reveal-right {
                        transform: translateY(25px);
                    }

                    .reveal-left.visible,
                    .reveal-right.visible {
                        transform: translateY(0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .reveal-up,
                    .reveal-left,
                    .reveal-right {
                        opacity: 1 !important;
                        transform: none !important;
                        transition: none !important;
                    }
                }


                .review-message {
                    overflow-wrap: anywhere;
                    word-break: break-word;
                    white-space: normal;
                    max-width: 100%;
                }
            `}</style>

        </section>
    );
};

export default Feedback;
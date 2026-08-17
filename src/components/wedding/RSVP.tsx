import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { SectionTitle, KolamDivider } from "./Ornaments";
import { couple } from "@/lib/wedding-data";

const formSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  guests: z.coerce.number().min(1, "At least 1 guest is required"),
  attending: z.enum(["yes", "no"]),
  events: z.array(z.string()).optional(),
  food_preference: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RSVP() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      guests: 1,
      attending: "yes",
      events: [],
      food_preference: "",
      message: "",
    },
  });

  const isAttending = form.watch("attending") === "yes";

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("rsvps").insert({
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        guests: values.guests,
        attending: values.attending === "yes",
        events: values.attending === "yes" ? (values.events || []) : [],
        food_preference: values.food_preference || null,
        message: values.message || null,
      });

      if (error) throw error;
      
      setIsSuccess(true);
      toast.success("RSVP submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
      <SectionTitle kicker="Your presence would make our celebration even more special.">
        Will You Join Us?
      </SectionTitle>

      <div className="mt-12" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="kolam-frame relative px-6 py-16 text-center sm:px-12 bg-[var(--sage)]/40 backdrop-blur-sm"
            >
              <span className="kolam-frame-inner" aria-hidden />
              <h2 className="font-script text-5xl text-[var(--cream)] sm:text-7xl">
                {couple.shortGroom} <span className="text-[var(--blush)]">&</span> {couple.shortBride}
              </h2>
              <KolamDivider className="mt-6" />
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--cream)]/90 sm:text-base">
                Thank you for being a part of our journey. We can't wait to celebrate these beautiful
                moments with you.
              </p>
              <p className="font-script mt-6 text-3xl text-[var(--gold)]">With Love ❤️</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="card-invite p-6 sm:p-10"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--cream)]">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="border-[var(--blush)]/40 bg-[var(--sage-deep)] text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus-visible:ring-[var(--gold)]" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--cream)]">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="border-[var(--blush)]/40 bg-[var(--sage-deep)] text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus-visible:ring-[var(--gold)]" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--cream)]">Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+1 (555) 000-0000" className="border-[var(--blush)]/40 bg-[var(--sage-deep)] text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus-visible:ring-[var(--gold)]" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--cream)]">Number of Guests</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" className="border-[var(--blush)]/40 bg-[var(--sage-deep)] text-[var(--cream)] focus-visible:ring-[var(--gold)]" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="attending"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-[var(--cream)]">Will you be attending?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" className="border-[var(--blush)] text-[var(--gold)]" />
                              </FormControl>
                              <FormLabel className="font-normal text-[var(--cream)]">
                                Joyfully Accepts
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" className="border-[var(--blush)] text-[var(--gold)]" />
                              </FormControl>
                              <FormLabel className="font-normal text-[var(--cream)]">
                                Regretfully Declines
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {isAttending && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="events"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-[var(--cream)]">Events Attending</FormLabel>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                              {["Haldi", "Sangeeth", "Wedding"].map((item) => (
                                <FormField
                                  key={item}
                                  control={form.control}
                                  name="events"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item) ?? false}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), item])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item
                                                    )
                                                  )
                                            }}
                                            className="border-[var(--blush)] data-[state=checked]:bg-[var(--gold)] data-[state=checked]:text-white"
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal text-[var(--cream)]">
                                          {item}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--cream)]">Message for the Couple</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your wishes..."
                            className="min-h-[100px] border-[var(--blush)]/40 bg-[var(--sage-deep)] text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus-visible:ring-[var(--gold)]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[var(--gold)] text-[var(--sage-deep)] hover:bg-[var(--gold)]/90 sm:w-auto sm:px-12"
                  >
                    {isSubmitting ? "Submitting..." : "Submit RSVP"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

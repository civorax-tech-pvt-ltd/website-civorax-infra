"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  FileUp,
  Headset,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { company, createWhatsappLink } from "@/entities/company";
import SocialLinks from "@/shared/layout/SocialLinks";
import { submitInquiryAction } from "../server-actions/contact.actions";

const siteImage =
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85";

type FormState = {
  fullName: string;
  phone: string;
  location: string;
  service: string;
  budget: string;
  message: string;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  location: "",
  service: "Architectural Design",
  budget: "Under NPR 50 Lakhs",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const whatsappHref = useMemo(() => {
    const text = `Hello CivoraX Infra, I want to discuss a project.

Name: ${form.fullName || "Not provided"}
Phone: ${form.phone || "Not provided"}
Location: ${form.location || "Not provided"}
Service Needed: ${form.service}
Budget Range: ${form.budget}
Message: ${form.message || "Not provided"}
Selected Site Photo: ${selectedFile ? selectedFile.name : "No file selected"}

Note: I can send site photos here if needed.`;

    return createWhatsappLink(text);
  }, [form, selectedFile]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccessMessage("");
  }

  function validateForm() {
    const nextErrors: Partial<FormState> = {};
    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    } else if (form.fullName.trim().length < 3) {
      nextErrors.fullName = "Full name should be at least 3 characters.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!phoneRegex.test(form.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.location.trim()) {
      nextErrors.location = "Please enter your project location.";
    } else if (form.location.trim().length < 3) {
      nextErrors.location = "Location should be more specific.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please tell us a little about your project.";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleFileChange(file: File | undefined) {
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert("Please upload only PNG or JPG images.");
      return;
    }

    if (file.size > maxSize) {
      alert("File size should be under 10MB.");
      return;
    }

    setSelectedFile(file);
    setSuccessMessage("");
  }

  async function recordInquiry(channel: "email" | "whatsapp") {
    const result = await submitInquiryAction({
      fullname: form.fullName.trim(),
      contact: form.phone.trim(),
      address: form.location.trim(),
      contact_channel: channel,
      message: form.message.trim(),
      service: form.service,
      budget: form.budget,
    });

    if (!result.success) {
      // Non-blocking: the client's mailto/WhatsApp action still proceeds even if
      // this background record fails, so we just log it for now.
      console.error("Failed to record inquiry:", result.error);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    await recordInquiry("email");
    setIsSubmitting(false);

    const subject = encodeURIComponent(
      `New Project Inquiry from ${form.fullName.trim()}`
    );

    const body = encodeURIComponent(`New CivoraX Infra Project Inquiry

Full Name: ${form.fullName}
Phone Number: ${form.phone}
Project Location: ${form.location}
Service Needed: ${form.service}
Budget Range: ${form.budget}
Message: ${form.message}
Selected Site Photo: ${selectedFile ? selectedFile.name : "No file selected"}

Note: If a site photo was selected, ask the client to send it through WhatsApp or as an email attachment.`);

    window.location.href = `mailto:${company.projectEmail}?subject=${subject}&body=${body}`;

    setSuccessMessage(
      "Your inquiry is ready. Your email app should open with the project details."
    );
  }

  async function handleWhatsAppSubmit() {
    setSuccessMessage("");
    if (!validateForm()) return;

    setIsSubmitting(true);
    await recordInquiry("whatsapp");
    setIsSubmitting(false);

    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="relative overflow-hidden bg-[#fcf9f4] text-[#1c1c19]">
      <div className="absolute inset-0 -z-10 opacity-70 [background-image:linear-gradient(45deg,rgba(0,108,78,0.035)_25%,transparent_25%),linear-gradient(-45deg,rgba(0,108,78,0.035)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,rgba(0,108,78,0.035)_75%),linear-gradient(-45deg,transparent_75%,rgba(0,108,78,0.035)_75%)] [background-position:0_0,0_30px,30px_-30px,-30px_0] [background-size:60px_60px]" />

      <section className="mx-auto max-w-[1280px] px-5 pb-24 pt-20 sm:px-8 lg:px-16 lg:pb-28 lg:pt-24">
        <div className="mb-10 max-w-3xl">
          <span className="mb-5 inline-flex rounded-full bg-[#006c4e]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#006c4e]">
            Get In Touch
          </span>

          <h1 className="font-sora text-[44px] font-bold leading-[1.08] tracking-[-0.05em] text-[#1c1c19] sm:text-[58px] lg:text-[64px]">
            Let&apos;s Discuss Your Project
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#3d4a43] sm:text-lg">
            Whether it&apos;s a heritage restoration or a modern infrastructure
            project, our team is ready to bring your vision to life with
            precision and soul.
          </p>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-12">
          <div className="rounded-[28px] border border-white/60 bg-white p-6 shadow-[0_18px_70px_rgba(8,29,48,0.07)] sm:p-8 lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 ml-2 block text-sm font-bold tracking-[0.04em] text-[#3d4a43]">
                    Full Name
                  </label>
                  <input
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    className="h-12 w-full rounded-xl border-0 bg-[#f0ede9] px-4 text-sm text-[#1c1c19] outline-none transition-all placeholder:text-[#6d7a72] focus:ring-2 focus:ring-[#006c4e]"
                    placeholder="Enter your full name"
                    type="text"
                  />
                  {errors.fullName ? (
                    <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 ml-2 block text-sm font-bold tracking-[0.04em] text-[#3d4a43]">
                    Phone Number
                  </label>
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="h-12 w-full rounded-xl border-0 bg-[#f0ede9] px-4 text-sm text-[#1c1c19] outline-none transition-all placeholder:text-[#6d7a72] focus:ring-2 focus:ring-[#006c4e]"
                    placeholder="Enter your phone number"
                    type="tel"
                  />
                  {errors.phone ? (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="mb-2 ml-2 block text-sm font-bold tracking-[0.04em] text-[#3d4a43]">
                  Project Location
                </label>
                <input
                  value={form.location}
                  onChange={(event) => updateField("location", event.target.value)}
                  className="h-12 w-full rounded-xl border-0 bg-[#f0ede9] px-4 text-sm text-[#1c1c19] outline-none transition-all placeholder:text-[#6d7a72] focus:ring-2 focus:ring-[#006c4e]"
                  placeholder="Enter project location"
                  type="text"
                />
                {errors.location ? (
                  <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                ) : null}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 ml-2 block text-sm font-bold tracking-[0.04em] text-[#3d4a43]">
                    Service Needed
                  </label>
                  <select
                    value={form.service}
                    onChange={(event) => updateField("service", event.target.value)}
                    className="h-12 w-full rounded-xl border-0 bg-[#f0ede9] px-4 text-sm text-[#1c1c19] outline-none transition-all focus:ring-2 focus:ring-[#006c4e]"
                  >
                    <option>Architectural Design</option>
                    <option>Building Construction</option>
                    <option>Interior Design</option>
                    <option>Heritage Restoration</option>
                    <option>Renovation</option>
                    <option>3D Visualization</option>
                    <option>Project Supervision</option>
                    <option>Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 ml-2 block text-sm font-bold tracking-[0.04em] text-[#3d4a43]">
                    Budget Range
                  </label>
                  <select
                    value={form.budget}
                    onChange={(event) => updateField("budget", event.target.value)}
                    className="h-12 w-full rounded-xl border-0 bg-[#f0ede9] px-4 text-sm text-[#1c1c19] outline-none transition-all focus:ring-2 focus:ring-[#006c4e]"
                  >
                    <option>Under NPR 50 Lakhs</option>
                    <option>NPR 50 Lakhs - 1 Crore</option>
                    <option>NPR 1 Crore - 5 Crores</option>
                    <option>Above NPR 5 Crores</option>
                    <option>Not Sure Yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 ml-2 block text-sm font-bold tracking-[0.04em] text-[#3d4a43]">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  className="min-h-[130px] w-full resize-none rounded-xl border-0 bg-[#f0ede9] px-4 py-4 text-sm text-[#1c1c19] outline-none transition-all placeholder:text-[#6d7a72] focus:ring-2 focus:ring-[#006c4e]"
                  placeholder="Describe your project, goal, timeline, budget idea, or requirements..."
                />
                {errors.message ? (
                  <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 ml-2 block text-sm font-bold tracking-[0.04em] text-[#3d4a43]">
                  Upload Your Ideas (Optional)
                </label>

                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(event) => handleFileChange(event.target.files?.[0])}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleFileChange(event.dataTransfer.files?.[0]);
                  }}
                  className="flex min-h-[130px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#bccac1] bg-white/40 p-6 text-center transition-all hover:bg-[#f6f3ee]"
                >
                  <FileUp size={28} className="mb-3 text-[#6d7a72]" />

                  {selectedFile ? (
                    <>
                      <p className="font-bold text-[#006c4e]">{selectedFile.name}</p>
                      <p className="mt-1 text-xs text-[#6d7a72]">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-[#3d4a43]">
                        Drag & drop or{" "}
                        <span className="font-bold text-[#006c4e]">browse</span> files
                      </p>
                      <p className="mt-1 text-xs text-[#6d7a72]">PNG, JPG up to 10MB</p>
                    </>
                  )}
                </button>
              </div>

              {successMessage ? (
                <div className="flex items-start gap-3 rounded-xl bg-[#20b486]/10 p-4 text-sm text-[#006c4e]">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                  <p>{successMessage}</p>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-[#20b486] px-6 text-sm font-bold text-[#003f2c] shadow-[0_18px_50px_rgba(32,180,134,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#006c4e] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry by Email"}
                <Send size={18} />
              </button>

              <div className="rounded-[20px] border border-white/60 bg-[#ebe8e3] p-6">
                <h3 className="font-sora text-lg font-bold">Connect With Us</h3>
                <p className="mt-2 text-sm leading-6 text-[#3d4a43]">
                  Follow our updates or message us through your preferred platform.
                </p>

                <div className="mt-5">
                  <SocialLinks variant="light" />
                </div>
              </div>
            </form>
          </div>

          <aside className="space-y-5 lg:col-span-5">
            <div className="relative overflow-hidden rounded-[28px] bg-[#006c4e] p-8 text-white shadow-[0_18px_70px_rgba(0,108,78,0.16)]">
              <div className="relative z-10">
                <h2 className="font-sora text-3xl font-bold tracking-[-0.04em] sm:text-[34px]">
                  Quick Site Check?
                </h2>

                <p className="mt-4 text-base leading-7 text-white/88">
                  Fill the inquiry form first, then send your project details
                  directly through WhatsApp for a faster response.
                </p>

                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  disabled={isSubmitting}
                  className="mt-6 inline-flex h-[50px] items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                >
                  <MessageCircle size={19} />
                  Send on WhatsApp
                </button>
              </div>

              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#20b486]/25 blur-3xl" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[20px] border border-white/60 bg-[#ebe8e3] p-6">
                <MapPin size={22} className="mb-4 text-[#006c4e]" />
                <h3 className="font-sora text-lg font-bold">Visit Us</h3>
                <p className="mt-2 text-sm leading-6 text-[#3d4a43]">{company.location}</p>
              </div>

              <div className="rounded-[20px] border border-white/60 bg-[#ebe8e3] p-6">
                <Mail size={22} className="mb-4 text-[#006c4e]" />
                <h3 className="font-sora text-lg font-bold">Email Us</h3>
                <p className="mt-2 text-sm leading-6 text-[#3d4a43]">
                  <a href={`mailto:${company.projectEmail}`} className="transition-colors hover:text-[#006c4e]">
                    {company.projectEmail}
                  </a>
                  <br />
                  <a href={`mailto:${company.email}`} className="transition-colors hover:text-[#006c4e]">
                    {company.email}
                  </a>
                </p>
              </div>

              <div className="flex items-center justify-between rounded-[20px] border border-white/60 bg-[#ebe8e3] p-6 sm:col-span-2">
                <div>
                  <Phone size={22} className="mb-4 text-[#006c4e]" />
                  <h3 className="font-sora text-lg font-bold">Call for Consultation</h3>
                  <p className="mt-2 text-sm leading-6 text-[#3d4a43]">
                    <a href={company.phoneHref} className="transition-colors hover:text-[#006c4e]">
                      {company.phoneDisplay}
                    </a>
                  </p>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-[#006c4e]">
                  <Headset size={28} />
                </div>
              </div>
            </div>

            <div className="group h-64 overflow-hidden rounded-[26px] shadow-[0_18px_60px_rgba(8,29,48,0.12)]">
              <Image
                src={siteImage}
                alt="CivoraX architectural interior detail"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

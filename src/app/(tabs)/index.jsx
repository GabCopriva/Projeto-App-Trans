import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Heart,
  BookOpen,
  Users,
  Hospital,
  Newspaper,
  Briefcase,
  CheckCircle,
  Globe,
} from "lucide-react-native";
import { useLanguage } from "@/utils/useLanguage";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const { language, setLanguage, t, loadLanguage, isLoaded } = useLanguage();

  // Load language on mount
  useEffect(() => {
    loadLanguage();
  }, [loadLanguage]);

  // Fetch recent guides
  const { data: guides = [] } = useQuery({
    queryKey: ["guides", { verified: true, limit: 3 }],
    queryFn: async () => {
      const response = await fetch("/api/guias?verified=true");
      if (!response.ok) throw new Error("Failed to fetch guides");
      const data = await response.json();
      return data.slice(0, 3);
    },
  });

  // Fetch recent news
  const { data: news = [] } = useQuery({
    queryKey: ["news", { verified: true, limit: 3 }],
    queryFn: async () => {
      const response = await fetch("/api/noticias?verified=true&limit=3");
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    },
  });

  const categories = [
    {
      name: t("guidesCategory"),
      icon: BookOpen,
      color: "#3B82F6",
      screen: "guides",
    },
    {
      name: t("providersCategory"),
      icon: Users,
      color: "#10B981",
      screen: "providers",
    },
    {
      name: t("hospitalsCategory"),
      icon: Hospital,
      color: "#EF4444",
      screen: "hospitals",
    },
    {
      name: t("newsCategory"),
      icon: Newspaper,
      color: "#8B5CF6",
      screen: "news",
    },
    {
      name: t("opportunitiesCategory"),
      icon: Briefcase,
      color: "#F59E0B",
      screen: "opportunities",
    },
  ];

  // Don't render until language is loaded
  if (!isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FDF2F8",
        }}
      >
        <Text style={{ fontSize: 16, color: "#6B7280" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "#FDF2F8", paddingTop: insets.top }}
    >
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#EC4899",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Heart size={24} color="white" />
            </View>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#EC4899" }}
            >
              {t("appName")}
            </Text>
          </View>

          {/* Language Toggle */}
          <TouchableOpacity
            onPress={() => setLanguage(language === "pt" ? "en" : "pt")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F3F4F6",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Globe size={16} color="#6B7280" style={{ marginRight: 4 }} />
            <Text style={{ fontSize: 12, color: "#6B7280", fontWeight: "500" }}>
              {language === "pt" ? "PT" : "EN"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F9FAFB",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: "#E5E7EB",
          }}
        >
          <Search size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
          <TextInput
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{ flex: 1, fontSize: 16, color: "#374151" }}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 24 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#111827",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            {t("heroTitle")}
            {"\n"}
            <Text style={{ color: "#EC4899" }}>{t("heroTitleHighlight")}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#6B7280",
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            {t("heroSubtitle")}
          </Text>
        </View>

        {/* Categories Grid */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#111827",
              marginBottom: 16,
            }}
          >
            {t("exploreCategories")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.name}
                style={{
                  width: "48%",
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: category.color,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <category.icon size={24} color="white" />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 4,
                  }}
                >
                  {category.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#6B7280",
                    lineHeight: 16,
                  }}
                >
                  {category.name === t("guidesCategory") &&
                    t("guidesDescription")}
                  {category.name === t("providersCategory") &&
                    t("providersDescription")}
                  {category.name === t("hospitalsCategory") &&
                    t("hospitalsDescription")}
                  {category.name === t("newsCategory") && t("newsDescription")}
                  {category.name === t("opportunitiesCategory") &&
                    t("opportunitiesDescription")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Guides */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <BookOpen size={20} color="#3B82F6" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#111827",
              }}
            >
              {t("recentGuides")}
            </Text>
          </View>
          {guides.map((guide) => (
            <TouchableOpacity
              key={guide.id}
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#111827",
                    flex: 1,
                    marginRight: 8,
                  }}
                >
                  {guide.title}
                </Text>
                {guide.verified && <CheckCircle size={16} color="#10B981" />}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  marginBottom: 8,
                  lineHeight: 20,
                }}
              >
                {guide.summary}
              </Text>
              <View
                style={{
                  backgroundColor: "#DBEAFE",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#1E40AF",
                    fontWeight: "500",
                  }}
                >
                  {guide.category.replace("_", " ")}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent News */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Newspaper size={20} color="#8B5CF6" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#111827",
              }}
            >
              {t("recentNews")}
            </Text>
          </View>
          {news.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: 8,
                }}
              >
                {article.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  marginBottom: 8,
                  lineHeight: 20,
                }}
              >
                {article.summary}
              </Text>
              {article.source && (
                <View
                  style={{
                    backgroundColor: "#F3E8FF",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#7C3AED",
                      fontWeight: "500",
                    }}
                  >
                    {article.source}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

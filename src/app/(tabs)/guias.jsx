import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { Search, BookOpen, CheckCircle, Filter } from "lucide-react-native";

export default function GuidesScreen() {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(true);

  const {
    data: guides = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "guides",
      {
        search: searchTerm,
        category: selectedCategory,
        verified: showVerifiedOnly,
      },
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory) params.append("category", selectedCategory);
      if (showVerifiedOnly) params.append("verified", "true");

      const response = await fetch(`/api/guides?${params}`);
      if (!response.ok) throw new Error("Failed to fetch guides");
      return response.json();
    },
  });

  const categories = [
    { value: "", label: "Todas" },
    { value: "name_change", label: "Mudança de Nome" },
    { value: "hormone_therapy", label: "Terapia Hormonal" },
    { value: "healthcare", label: "Saúde" },
    { value: "legal", label: "Direitos Legais" },
    { value: "social", label: "Questões Sociais" },
  ];

  const renderGuide = ({ item: guide }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#111827",
            flex: 1,
            marginRight: 8,
          }}
        >
          {guide.title}
        </Text>
        {guide.verified && <CheckCircle size={20} color="#10B981" />}
      </View>

      <Text
        style={{
          fontSize: 14,
          color: "#6B7280",
          marginBottom: 12,
          lineHeight: 20,
        }}
      >
        {guide.summary}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#DBEAFE",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#1E40AF",
              fontWeight: "500",
            }}
          >
            {guide.category
              .replace("_", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </Text>
        </View>
        {guide.author && (
          <Text style={{ fontSize: 12, color: "#9CA3AF" }}>
            por {guide.author}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#3B82F6",
          borderRadius: 12,
          paddingVertical: 12,
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          Ler Guia Completo
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <BookOpen size={28} color="#3B82F6" style={{ marginRight: 12 }} />
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#111827" }}>
            Guias e Informações
          </Text>
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
            marginBottom: 12,
          }}
        >
          <Search size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
          <TextInput
            placeholder="Buscar guias..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{ flex: 1, fontSize: 16, color: "#374151" }}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              onPress={() => setSelectedCategory(category.value)}
              style={{
                backgroundColor:
                  selectedCategory === category.value ? "#3B82F6" : "#F3F4F6",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  color:
                    selectedCategory === category.value ? "white" : "#374151",
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Verified Filter */}
        <TouchableOpacity
          onPress={() => setShowVerifiedOnly(!showVerifiedOnly)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: showVerifiedOnly ? "#10B981" : "#D1D5DB",
              backgroundColor: showVerifiedOnly ? "#10B981" : "transparent",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
            }}
          >
            {showVerifiedOnly && <CheckCircle size={12} color="white" />}
          </View>
          <CheckCircle size={16} color="#10B981" style={{ marginRight: 4 }} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#374151",
            }}
          >
            Apenas Verificados
          </Text>
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#6B7280" }}>
            Carregando guias...
          </Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#EF4444",
              textAlign: "center",
            }}
          >
            Erro ao carregar guias. Tente novamente.
          </Text>
        </View>
      )}

      {/* Guides List */}
      {!isLoading && !error && (
        <FlatList
          data={guides}
          renderItem={renderGuide}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: insets.bottom + 20,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: "center",
                paddingVertical: 60,
                paddingHorizontal: 20,
              }}
            >
              <BookOpen
                size={64}
                color="#D1D5DB"
                style={{ marginBottom: 16 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                Nenhum guia encontrado
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  textAlign: "center",
                }}
              >
                Tente ajustar os filtros ou termos de busca.
              </Text>
            </View>
          )}
          ListFooterComponent={() =>
            guides.length > 0 && (
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: "#6B7280" }}>
                  Mostrando {guides.length} guia{guides.length !== 1 ? "s" : ""}
                  {searchTerm && ` para "${searchTerm}"`}
                </Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
}

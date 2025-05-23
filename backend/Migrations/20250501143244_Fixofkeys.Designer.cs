﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RSTracker.Migrations
{
    [DbContext(typeof(PlayerDbContext))]
    [Migration("20250501143244_Fixofkeys")]
    partial class Fixofkeys
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("RSTracker.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Age")
                        .HasColumnType("integer");

                    b.Property<int>("Height")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Weight")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("RSTracker.Models.RPE", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<int>("DayOfWeek")
                        .HasColumnType("integer");

                    b.Property<int>("IntervalInMinutes")
                        .HasColumnType("integer");

                    b.Property<int>("LeagueWeek")
                        .HasColumnType("integer");

                    b.Property<int?>("PlayerId")
                        .HasColumnType("integer");

                    b.Property<int>("Value")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PlayerId");

                    b.ToTable("RPEs");
                });

            modelBuilder.Entity("RSTracker.Models.Welness", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<int>("DayOfWeek")
                        .HasColumnType("integer");

                    b.Property<int>("LeagueWeek")
                        .HasColumnType("integer");

                    b.Property<int>("MuscleStatus")
                        .HasColumnType("integer");

                    b.Property<int?>("PlayerId")
                        .HasColumnType("integer");

                    b.Property<int>("RecoveryStatus")
                        .HasColumnType("integer");

                    b.Property<int>("SleepStatus")
                        .HasColumnType("integer");

                    b.Property<int>("StressStatus")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PlayerId");

                    b.ToTable("WelnessRecords");
                });

            modelBuilder.Entity("RSTracker.Models.RPE", b =>
                {
                    b.HasOne("RSTracker.Models.Player", null)
                        .WithMany("RPERecords")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RSTracker.Models.Welness", b =>
                {
                    b.HasOne("RSTracker.Models.Player", null)
                        .WithMany("WelnessRecords")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RSTracker.Models.Player", b =>
                {
                    b.Navigation("RPERecords");

                    b.Navigation("WelnessRecords");
                });
#pragma warning restore 612, 618
        }
    }
}
